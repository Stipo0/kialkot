using kialkot.Models.Domain;

namespace kialkot.Services.JwtTokenService
{
    public interface IJwtTokenService
    {
        string CreateTokenAsync(User user);
    }
}
