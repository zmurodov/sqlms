using System.Collections.Generic;

namespace SQLMS.Models
{
    public class Table
    {
        public string Catalog { get; set; }
        public string Schema { get; set; }
        public string Name { get; set; }

        public List<Column> Columns { get; set; }
    }
}