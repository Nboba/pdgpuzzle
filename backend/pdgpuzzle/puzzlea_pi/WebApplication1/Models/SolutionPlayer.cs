using static WebApplication1.SSolver.Solver;

namespace WebApplication1.Models
{
    public class SolutionPlayer
    {
        public int SolutionTime { get; set; } = 0;
        public int SolutionNMoves { get; set; } = 0;
        public DungeonWMoves[] SolutionMoves { get; set; } = [];
        public DateTime SolutionDate { get; set; }= DateTime.Now;
        public DateTime solutionLastTry { get; set; } = DateTime.Now;
    }
}
