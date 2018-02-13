using System;
using loginExamplev2.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace loginExamplev2.Controllers {
    public class UserController : Controller {
        private IConfiguration _config;
        public UserController (IConfiguration config) {
            this._config = config;
        }

        [Authorize]
        [HttpGet]
        public JsonResult Greet () {
            return Json (new { Message = "This message comes from server." });
        }

        [HttpPost]
        public JsonResult SignIn ([FromBody] LoginModel login) {
            var token = this.GenerateToken (login);
            return Json (token);
        }

        private dynamic GenerateToken (LoginModel login) {
            var claims = new [] {
                new Claim (JwtRegisteredClaimNames.Sub, login.Email),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ())
            };
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (this._config["Token:Key"]));
            var creds = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken (
                issuer : this._config["Token:Issuer"],
                audience : _config["Token:Audience"],
                claims : claims,
                expires : DateTime.Now.AddSeconds (30),
                signingCredentials : creds);

            return new {
                Token = new JwtSecurityTokenHandler ().WriteToken (token),
                    Expiration = token.ValidTo
            };
        }
    }
}