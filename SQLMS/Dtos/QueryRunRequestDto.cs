using System.ComponentModel.DataAnnotations;

namespace SQLMS.Dtos
{
    public class QueryRunRequestDto
    {
        [Required]
        public string Query { get; set; }

        public string DatabaseName { get; set; }
    }
}