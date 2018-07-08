using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sacantrell.Site.Blackjack
{
    public class BlackjackHub : Hub, IBlackjack
    {
        public async Task<int> GetPlayerCount()
        {
            throw new NotImplementedException();
        }
    }
}