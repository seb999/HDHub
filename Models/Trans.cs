using System;

using System.ComponentModel.DataAnnotations.Schema;


namespace HDHub.Models
{
    public class Trans
    {
        public long TransId { get; set; }
        public string UserId { get; set; }
        public DateTime TransDate { get; set; }
        public int TransAlat { get; set; }
        public int TransAsat { get; set; }
        [NotMapped]
        public long TransDateUtc { get; set; }
    }
}
