using kialkot.Models.Domain;
using kialkot.Models.Request;
using kialkot.Models.Response;
using kialkot.Repositories.ChatRepository;

namespace kialkot.Services.ChatRepository
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;
        public ChatService(
            IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task<GetMessagesDto> CreateAsync(User user, Job job, SendMessageDto sendMessageDto)
        {
            var chatMessage = new ChatMessage
            {
                JobId = job.Id,
                UserId = user.Id,
                User = user,
                Job = job,
                Message = sendMessageDto.Message,
                SendAt = DateTime.Now,
                NewMessage = true
            };

            var message = await _chatRepository.CreateAsync(chatMessage);
            return new GetMessagesDto
            {
                Id = message.Id,
                UserId = message.UserId,
                UserNickName = message.User.NickName,
                Message = message.Message,
                NewMessage = message.NewMessage,
                SendAt = message.SendAt
            };
        }

        public async Task<List<GetMessagesDto>> GetMessages(int jobId)
        {
            var messages = await _chatRepository.GetMessagebyJobId(jobId);
            var getMessagesDtos = new List<GetMessagesDto>();
            foreach (var message in messages)
            {
                getMessagesDtos.Add(new GetMessagesDto
                {
                    Id = message.Id,
                    UserId = message.UserId,
                    UserNickName = message.User.NickName,
                    Message = message.Message,
                    NewMessage = message.NewMessage,
                    SendAt = message.SendAt
                });

                message.NewMessage = false;
            }
            await _chatRepository.Update(messages);
            return getMessagesDtos;
        }

    }
}
