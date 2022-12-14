using kialkot.Data;
using kialkot.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace kialkot.Repositories.ChatRepository
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChatMessage> CreateAsync(ChatMessage chatMessage)
        {
            await _context.Messages.AddAsync(chatMessage);
            await _context.SaveChangesAsync();
            return chatMessage;
        }
        
        public async Task<List<ChatMessage>> GetMessagebyJobId(int jobId)
        {
            return await _context.Messages.Where(x => x.JobId == jobId).ToListAsync();
        }

        public async Task Update(List<ChatMessage> messages)
        {
            _context.Messages.UpdateRange(messages);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckNewMessage(int jobId, int userId)
        {
            return await _context.Messages.AnyAsync(x => x.JobId == jobId && x.NewMessage == true && x.UserId != userId);
        }
    }
}
