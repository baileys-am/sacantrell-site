using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace sacantrell_site.Blackjack
{
    public class ChatHub : Hub
    {
        private static ConcurrentDictionary<string, string> _users = new ConcurrentDictionary<string, string>();

        public async Task Join(string username) {
            _users[this.Context.ConnectionId] = username;
            await this.Clients.Others.SendAsync("userJoined", username);
        }

        public async Task SendMessage(string message)
        {
            var username = _users[this.Context.ConnectionId];
            await this.Clients.Others.SendAsync("messageBroadcast", new ChatMessage() { Sender = username, Message = message });
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public async override Task OnDisconnectedAsync(Exception ex)
        {
            _users.TryRemove(this.Context.ConnectionId, out string username);
            await this.Clients.Others.SendAsync("userLeft", username);
            await base.OnDisconnectedAsync(ex);
        }
    }
}
