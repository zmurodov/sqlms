using FluentValidation;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SQLMS.Dtos
{
    public class ConnRequestDto
    {
        [JsonPropertyName("serverName")]
        public string ServerName { get; set; }
        
        [JsonPropertyName("port")]
        public int? Port { get; set; }
        
        [JsonPropertyName("username")]
        public string Username { get; set; }
        
        [JsonPropertyName("password")]
        public string Password { get; set; }


        public class Validator : AbstractValidator<ConnRequestDto>
        {
            public Validator()
            {
                RuleFor(x => x.ServerName).NotEmpty();
            }
        }
    }

}