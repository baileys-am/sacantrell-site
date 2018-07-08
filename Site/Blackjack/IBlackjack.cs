using System.Threading.Tasks;

namespace Sacantrell.Site.Blackjack
{
    public interface IBlackjack
    {
        Task<int> GetPlayerCount();
    }
}
