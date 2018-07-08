using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sacantrell.Site.Blackjack
{
    public class ChatMessage
    {
        public string Sender { get; set; } = String.Empty;

        public string Message { get; set; } = String.Empty;
    }
}