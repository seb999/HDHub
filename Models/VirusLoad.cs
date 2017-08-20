using System;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace HDHub.Models
{
    public class VirusLoad
    {
        [Key]
        public long VirusLoadId { get; set; }
        public string UserId { get; set; }
        public DateTime VirusLoadDate { get; set; }
        public int VirusLoadValue { get; set; }
        [NotMapped]
        public long VirusLoadDateUtc { get; set; }
    }
}