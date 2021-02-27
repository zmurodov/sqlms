using System.Collections.Generic;

namespace SQLMS.Models
{
    public class Database
    {
        public string Name { get; set; }
        public int DatabaseId { get; set; }

        public List<Table> Tables { get; set; }
    }
}