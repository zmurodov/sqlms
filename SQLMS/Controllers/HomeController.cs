using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SQLMS.Dtos;
using SQLMS.Models;

namespace SQLMS.Controllers
{
    public class HomeController : Controller
    {

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("connect")]
        public async Task<ActionResult<ConnResponseDto>> Connect([FromBody] ConnRequestDto request)
        {
            var connString = GetConnectionString(request.ServerName, request.Port, request.Username, request.Password);

            SqlConnection conn = new SqlConnection(connString);
            ConnResponseDto result = null;

            try
            {
                conn.Open();

                var connClaims = new List<Claim>
                {
                    new Claim("Username", request.Username),
                    new Claim("Password", request.Password),
                    new Claim("ServerName", request.ServerName),
                    new Claim("Port", request.Port.ToString()),
                };

                var identity = new ClaimsIdentity(connClaims, "Connection Identity");

                var connPrincipal = new ClaimsPrincipal(new[] { identity });

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, connPrincipal);

                result = new ConnResponseDto
                {
                    Message = "Connected to database MSSQL Server.",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                result = new ConnResponseDto
                {
                    Message = ex.Message,
                    Success = false
                };
            }
            finally
            {
                conn.Dispose();
                conn.Close();
            }
            return Ok(result);
        }

        [Authorize]
        [HttpPost("run-query")]
        public IActionResult Run([FromBody]QueryRunRequestDto request)
        {
            var (serverName, username, password, port) = GetConnectionInfo();

            var connString = GetConnectionString(serverName, port, username, password);
            
            var result = new List<Dictionary<string, string>>();
            var names = new List<string>();
            var query = "";

            if (request.DatabaseName != null)
                query += $"USE \"{request.DatabaseName}\"; ";

            query += request.Query;
            
            SqlConnection conn = new SqlConnection(connString);
            conn.StatisticsEnabled = true;

            try
            {
                conn.Open();
                SqlCommand dbCommand = new SqlCommand(query, conn);
                var reader = dbCommand.ExecuteReader();
                


                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var dict = new Dictionary<string, string>();
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            dict.Add(reader.GetName(i), reader.GetValue(i).ToString());
                        }
                        result.Add(dict);
                    }
                }

                if (result.Count > 0)
                {
                    names.AddRange(result[0].Keys);
                }

                var stats = conn.RetrieveStatistics();
                int ms = 1000;                          
                var date = new DateTime(int.Parse(stats["ExecutionTime"].ToString()) * 10000);
                var timestr = date.ToString("HH:mm:ss.fff");

                var stat = new {
                    statMessage = "Query executed successfully",
                    statRows = $"{stats["SelectRows"]} rows",
                    statTime = $"Elapsed: {timestr}"
                };


                return Ok(new { result = result, names = names, stat = stat });

            }
            catch (Exception e)
            {
                return BadRequest(new {error = e.Message});
            }
            finally
            {
                if (conn != null)
                {
                    conn.Dispose();
                    conn.Close();
                }
            }

        }

        [Authorize]
        [HttpGet("get-databases")]
        public ActionResult<DatabasesResponse> GetDatabases()
        {
            var (serverName, username, password, port) = GetConnectionInfo();

            var connString = GetConnectionString(serverName, port, username, password);

            SqlConnection conn = new SqlConnection(connString);

            var getDatabasesQuery =
                "select database_id, name from sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb');";
            try
            {
                conn.Open();
                SqlCommand dbCommand = new SqlCommand(getDatabasesQuery, conn);

                var reader = dbCommand.ExecuteReader();

                var databasesList = new List<Database>();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var db = new Database
                        {
                            DatabaseId = (int) reader["database_id"],
                            Name = reader["name"].ToString(),
                        };
                        databasesList.Add(db);
                    }
                }

                foreach (var database in databasesList)
                {
                    var tables = new List<Table>();
                    var getTablesQuery =
                        $"USE \"{database.Name}\"; SELECT table_catalog, table_schema, table_name from INFORMATION_SCHEMA.TABLES;";

                    SqlCommand tableCommand = new SqlCommand(getTablesQuery, conn);

                    var tableReader = tableCommand.ExecuteReader();

                    if (tableReader.HasRows)
                    {
                        while (tableReader.Read())
                        {
                            var table = new Table
                            {
                                Catalog = tableReader["table_catalog"].ToString(),
                                Schema = tableReader["table_schema"].ToString(),
                                Name = tableReader["table_name"].ToString()
                            };
                            tables.Add(table);
                        }
                    }

                    database.Tables = tables;

                    foreach (var table in database.Tables)
                    {
                        var getColumnsQuery =
                            $"use \"{database.Name}\"; SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = '{table.Name}';";

                        var columns = new List<Column>();

                        SqlCommand columnsCommand = new SqlCommand(getColumnsQuery, conn);

                        var columnsReader = columnsCommand.ExecuteReader();

                        if (columnsReader.HasRows)
                        {
                            while (columnsReader.Read())
                            {
                                var column = new Column
                                {
                                    Name = columnsReader["column_name"].ToString(),
                                    Type = columnsReader["data_type"].ToString(),
                                    MaxLength = columnsReader["character_maximum_length"].ToString()
                                };

                                columns.Add(column);
                            }
                        }

                        table.Columns = columns;
                    }
                }

                return Ok(new DatabasesResponse
                {
                    Databases = databasesList
                });
            }
            catch (Exception e)
            {
                return BadRequest(new {error = e.Message});
            }
            finally
            {
                if (conn != null)
                {
                    conn.Dispose();
                    conn.Close();
                }
            }
        }


        [HttpPost("disconnect")]
        public async Task<IActionResult> Disconnnect()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("test")]
        public IActionResult Test()
        {
            var (serverName, username, password, port) = GetConnectionInfo();

            var connString = GetConnectionString(serverName, port, username, password);
            SqlConnection conn = new SqlConnection(connString);

            try
            {
                conn.Open();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            finally
            {
                conn.Dispose();
                conn.Close();
            }
            return Ok();
        }

        private static string GetConnectionString(string serverName, int? port, string userName, string password)
        {
            var serverWithPort = serverName + (port.HasValue && port.Value != 0 ? $",{port.Value}" : "");
            var connString =
                $"Server={serverWithPort};User Id={userName};Password={password};MultipleActiveResultSets=true;Connection Timeout=30;";

            return connString;
        }
        
        private (string serverName, string userName, string password, int port) GetConnectionInfo()
        {
            var serverName = HttpContext.User.FindFirst(x => x.Type == "ServerName")?.Value;
            var username = HttpContext.User.FindFirst(x => x.Type == "Username")?.Value;
            var password = HttpContext.User.FindFirst(x => x.Type == "Password")?.Value;
            int.TryParse(HttpContext.User.FindFirst(x => x.Type == "Port")?.Value, out var port);

            return (serverName, username, password, port);
        }
    }
}