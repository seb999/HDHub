using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HDHub.Models;
using HDHub.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HDHub.Controllers.API
{
    [Route("api/[controller]")]
    public class TransController : Controller
    {
        private ApplicationDbContext ApplicationDbContext { get; set; }
        public string UserId { get; set; }

        public TransController([FromServices] ApplicationDbContext appDbContext)
        {
            ApplicationDbContext = appDbContext;
        }

        [HttpGet]
        public IEnumerable<Trans> Get()
        {
            UserId = User.Claims.FirstOrDefault().Value;
            return ApplicationDbContext.Trans
                .Where(p=>p.UserId == UserId)
                .Where(p => ConvertDate(p)).OrderBy(p => p.TransDate).ToList();
        }

        private bool ConvertDate(Trans p)
        {
            p.TransDateUtc = ToJsonTicks(p.TransDate);
            return true;
        }
        public long ToJsonTicks(DateTime value)
        {
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
        public void Post([FromBody]Trans trans)
        {
            if (trans == null) return;
            trans.UserId = User.Claims.FirstOrDefault().Value;
            ApplicationDbContext.Trans.Add(trans);
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
            Trans deleteItem = ApplicationDbContext.Trans.Where(p => p.TransId == id).FirstOrDefault();
            if (deleteItem != null)
            {
                ApplicationDbContext.Trans.Remove(deleteItem);
                ApplicationDbContext.SaveChanges();
            }
        }
    }
}
