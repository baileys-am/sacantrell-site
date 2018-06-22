using System.Threading.Tasks;

namespace sacantrell_site.Blackjack
{
    public interface IBlackjack
    {
        Task<int> GetPlayerCount();
    }
}
