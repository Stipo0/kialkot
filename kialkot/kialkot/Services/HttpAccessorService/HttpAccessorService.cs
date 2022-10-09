using System.Security.Claims;

namespace kialkot.Services.HttpAccesorService
{
    public class HttpAccessorService : IHttpAccessorService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpAccessorService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst("userId").Value;

            return Convert.ToInt32(userId);
        }
    }
}
