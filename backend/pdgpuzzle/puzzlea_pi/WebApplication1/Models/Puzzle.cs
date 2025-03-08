using static WebApplication1.SSolver.Solver;
namespace WebApplication1.Models
{
    public class Puzzle
    {
        public string id { get; set; } = System.Guid.NewGuid().ToString();
        public int[,] Matrix { get; set; } = new int[0, 0];
        public int NSolutions { get; set; } = 0;
        public int NMoves { get; set; } = 0;
        public int[] PlayerPostions { get; set; } = Array.Empty<int>();
        public List<int[]> EnemyPositions { get; set; } = new List<int[]>();
        public int[] DoorPosition { get; set; } = Array.Empty<int>();
        public DungeonWMoves[] Solution { get; set; } = Array.Empty<DungeonWMoves>();
        public SolutionPlayer PlayerSolution { get; set; } = new SolutionPlayer();


    public void FindPlayerPosition()
        {
            var myArray = this.Matrix.Cast<int>().ToList();
            int index = myArray.FindIndex(x => x == 5);
            this.PlayerPostions = new int[] { index / this.Matrix.GetLength(1), index % this.Matrix.GetLength(1) };
        }

        public void FindEnemyPosition()
        {

            for (int i = 0; i < this.Matrix.GetLength(0); i++)
            {
                for (int j = 0; j < this.Matrix.GetLength(1); j++)
                {
                    if (this.Matrix[i, j] == 3)
                    {
                        this.EnemyPositions.Add(new int[] { i, j });
                    }
                }
                    
             }

        }

        public void FindDoor()
        {
            var myArray = this.Matrix.Cast<int>().ToList();
            int index = myArray.FindIndex(x => x == 4);
            this.DoorPosition = new int[] { index / this.Matrix.GetLength(1), index % this.Matrix.GetLength(1) };
        }

        public void FindSolution()
        {
            List<Queue<DungeonWMoves>> solution = SSolver.Solver.solveGameWithMoves(this.Matrix);
            this.Solution = SSolver.Solver.getBestSolution(solution);
        }

        public void FindAllMetaData()
        {
            FindPlayerPosition();
            FindEnemyPosition();
            FindDoor();
            FindSolution();
        }
    }
}
