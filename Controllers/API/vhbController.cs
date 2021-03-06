﻿
using System.Collections.Generic;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using HDHub.Models;
using HDHub.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HDHub.Controllers.API
{
    [Route("api/[controller]")]
    public class VhbController : Controller
    {
        private ApplicationDbContext ApplicationDbContext { get; set; }

        public VhbController([FromServices] ApplicationDbContext appDbContext)
        {
            ApplicationDbContext = appDbContext;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
        }
    }
}
