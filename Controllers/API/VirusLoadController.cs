using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HDHub.Models;
using HDHub.Data;

namespace HDHub.Controllers.API
{
    [Route("api/[controller]")]
    public class VirusLoadController : Controller
    {
        private ApplicationDbContext ApplicationDbContext { get; set; }
        public string UserId { get; set; }

        public VirusLoadController([FromServices] ApplicationDbContext appDbContext)
        {
            ApplicationDbContext = appDbContext;
        }

        [HttpGet]
        public IEnumerable<VirusLoad> Get()
        {
            UserId = User.Claims.FirstOrDefault().Value;
            return ApplicationDbContext.VirusLoad
                .Where(p => p.UserId == UserId)
                .Where(p=>ConvertDate(p)).OrderBy(p=>p.VirusLoadDate).ToList();
        }

        private bool ConvertDate(VirusLoad p)
        {
            p.VirusLoadDate = p.VirusLoadDate.Date;
            p.VirusLoadDateUtc = ToJsonTicks(p.VirusLoadDate);
            return true;
        }

        public long ToJsonTicks(DateTime value)
        {
            Console.Write(value);
            return (value.ToUniversalTime().Ticks - ((new DateTime(1969, 12, 31, 0, 0, 0, DateTimeKind.Local)).Ticks)) / 10000;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]VirusLoad virusLoad)
        {
            if (virusLoad == null) return;
            virusLoad.UserId = User.Claims.FirstOrDefault().Value;
            ApplicationDbContext.VirusLoad.Add(virusLoad);
            ApplicationDbContext.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            VirusLoad deleteItem = ApplicationDbContext.VirusLoad.Where(p => p.VirusLoadId == id).FirstOrDefault();
            if (deleteItem != null)
            {
                ApplicationDbContext.VirusLoad.Remove(deleteItem);
                ApplicationDbContext.SaveChanges();
            }
        }
    }
}
