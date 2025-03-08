using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Petition
    {
        [Range(1, 11, ErrorMessage = "Height debe estar entre 1 y 11.")]
        public int Height { get; set; } = 7;

        [Range(1, 11, ErrorMessage = "Width debe estar entre 1 y 11.")]
        public int Width { get; set; } = 7;

        [Range(0.01, 0.35, ErrorMessage = "ExpantionFactor debe estar entre 0.01 y 0.35.")]
        public double ExpantionFactor { get; set; } = 0.13;

        [Range(0.01, 0.20, ErrorMessage = "EnemyFactor debe estar entre 0.01 y 0.20.")]
        public double EnemyFactor { get; set; } = 0.1;

        [Range(0.01, 0.25, ErrorMessage = "BlockFactor debe estar entre 0.01 y 0.25.")]
        public double BlockFactor { get; set; } = 0.13;

        [Range(1, 25, ErrorMessage = "nPop debe estar entre 1 y 25.")]
        public int NPop { get; set; } = 12;

        [Range(1, 40, ErrorMessage = "MaxIter debe estar entre 1 y 40.")]
        public int MaxIter { get; set; } = 20;

        [Range(0.01, 0.99, ErrorMessage = "MutationFactor debe estar entre 0.01 y 0.99.")]
        public double MutationFactor { get; set; } = 0.5;

        [Range(1, 25, ErrorMessage = "MaxMoves debe estar entre 1 y 25.")]
        public int MaxMoves { get; set; } = 15;

        [Range(1, 10, ErrorMessage = "Maximo numero de puzzles pedidos debe estar entre 1 y 10.")]
        public int Npuzzles { get; set; } = 1;

        public Petition()
        {
            (this.Height, this.Width,
            this.ExpantionFactor, this.EnemyFactor,
            this.BlockFactor, this.NPop, this.MaxIter,
            this.MutationFactor, this.MaxMoves,this.Npuzzles) = (6, 7, 0.083, 0.1, 0.1, 12, 40, 0.5, 12,1);
        }

        public Petition(Int16 height, Int16 width, double expantionFactor,
            double enemyFactor, double blockFactor,
            Int16 nPop, Int16 maxIter,
            double mutationFactor, Int16 maxMoves,Int16 Npuzzles)
        {
            (this.Height, this.Width, this.ExpantionFactor,
             this.EnemyFactor, this.BlockFactor,
             this.NPop, this.MaxIter,
             this.MutationFactor, this.MaxMoves,this.Npuzzles) = (height, width, expantionFactor, enemyFactor, blockFactor, nPop, maxIter, mutationFactor, maxMoves, Npuzzles);
        }
    }
}
