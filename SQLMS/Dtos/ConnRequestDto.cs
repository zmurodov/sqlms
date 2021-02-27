using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace SQLMS.Dtos
{
    public class ConnRequestDto
    {
        public string ServerName { get; set; }
        public string Username { get; set; }
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