﻿using kialkot.Models.Domain;

namespace kialkot.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task CreateAsync(User user);
        Task UpdateAsync(User user);
        Task<User?> GetByNameAsync(string name);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
        Task<bool> CheckExistEmail(string email);
        Task<bool> CheckExistName(string name);
    }
}
