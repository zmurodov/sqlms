using System.Collections.Generic;
using SQLMS.Models;

namespace SQLMS.Dtos
{
    public class DatabasesResponse
    {
        public List<Database> Databases { get; set; }
    }
}