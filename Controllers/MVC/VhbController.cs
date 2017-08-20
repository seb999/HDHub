
using Microsoft.AspNetCore.Mvc;

namespace HDHub.Controllers.MVC
{
    public class VhbController : Controller
    {
        public IActionResult Index()
        {
            //debug
            //return View();

            if (User.Identity.IsAuthenticated)
            {
                return View();
            }
            return RedirectToAction("Login", "Account");
        }
    }
}