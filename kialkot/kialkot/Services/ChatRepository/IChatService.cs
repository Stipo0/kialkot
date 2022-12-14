using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;

namespace kialkot.Services.ChatRepository
{
    public interface IChatService
    {
        Task<GetMessagesDto> CreateAsync(User user, Job job, SendMessageDto sendMessageDto);
        Task<List<GetMessagesDto>> GetMessages(int jobId);
    }
}
