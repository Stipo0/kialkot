using kialkot.Models.Domain;

namespace kialkot.Repositories.ChatRepository
{
    public interface IChatRepository
    {
        Task<ChatMessage> CreateAsync(ChatMessage chatMessage);
        Task<List<ChatMessage>> GetMessagebyJobId(int jobId);
        Task Update(List<ChatMessage> messages);
        Task<bool> CheckNewMessage(int jobId, int userId);
    }
}
