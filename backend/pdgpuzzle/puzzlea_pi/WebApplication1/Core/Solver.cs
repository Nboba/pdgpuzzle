using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.MechanicsClass;


namespace WebApplication1.SSolver{
// Node class equivalent to Python's Node class using generics
public class TreeNode<T>
{
	public T Value { get; }
	public TreeNode<T> Parent { get; }

	public TreeNode(T value, TreeNode<T> parent = null)
	{
		Value = value;
		Parent = parent;
	}
}

		public class Solver
	{
		public static int HashDungeon(int[,] dungeon)
		{
			int hash = 17;
			foreach (int value in dungeon)
			{
				unchecked
				{
					hash = hash * 23 + value.GetHashCode();
				}
			}
			return hash;
		}

		public static Queue<int[,]> GetRoute(int[,] leaf, TreeNode<int[,]> parent)
		{
			var node = new TreeNode<int[,]>(leaf, parent);
			var route = new Queue<int[,]>();
			while (node != null)
			{
				route.Enqueue(node.Value);
				node = node.Parent;
			}
			return route;
		}

		public static void SetState(Queue<TreeNode<int[,]>> states, List<int> memory, int[,] dungeon, TreeNode<int[,]> parent)
		{
			int hashD = HashDungeon(dungeon);
			if (!memory.Contains(hashD))
			{
				memory.Add(hashD);
				states.Enqueue(new TreeNode<int[,]>(dungeon, parent));
			}
		}

		public static List<Queue<int[,]>> SolveGame(int[,] dungeon,double limit)
		{
			var states = new Queue<TreeNode<int[,]>>();
			states.Enqueue(new TreeNode<int[,]>(dungeon.Clone() as int[,]));

			var memory = new List<int>
			{
				HashDungeon(dungeon)
			};

			var solutions = new List<Queue<int[,]>>();
			
			Stopwatch stopwatch = new Stopwatch();
			stopwatch.Start();

			while (states.Count > 0)
			{
				var currentState = states.Dequeue();
				var currentDungeon = currentState.Value;

				foreach (var move in Mechanics.MOVES)
				{
					var newDungeon = currentDungeon.Clone() as int[,];
					newDungeon = Mechanics.Step(newDungeon, move);
					if (Mechanics.Win(newDungeon))
					{
						solutions.Add(GetRoute(newDungeon, currentState));
					}
					else
					{
						SetState(states, memory, newDungeon, currentState);
					}
				}
				 if (stopwatch.Elapsed.TotalSeconds >= limit){
					break;
				 }
			}
			return solutions;
		}

		public static (int, int) NSolutions(int[,] dungeon, double limit)
		{
			var solutions = SolveGame(dungeon,limit);

			int n = solutions.Count;
			if (n == 0) return (n, 0);

			int minM = solutions.Min(sol => sol.Count);
			return (n, minM);
		}
		
			public class DungeonWMoves
		{
			public int[,] dungeon;
			public string move;
			public (int,int) moveCoord;

			public DungeonWMoves(int[,] dungeon, string movement, (int, int) moveCoord)
			{
				this.dungeon = dungeon;
				this.move = movement;
				this.moveCoord = moveCoord;

            }
		}
		 public static void setStateWithMoves(Queue<TreeNode<DungeonWMoves>> states, List<int> memory, DungeonWMoves dungeon, TreeNode<DungeonWMoves> parent)
		{
			int hashD = HashDungeon(dungeon.dungeon);
			if (!memory.Contains(hashD))
			{
				memory.Add(hashD);
				states.Enqueue(new TreeNode<DungeonWMoves>(dungeon, parent));
			}
		}
		public static Queue<DungeonWMoves> GetRouteWMoves(DungeonWMoves leaf, TreeNode<DungeonWMoves> parent)
		{
			var node = new TreeNode<DungeonWMoves>(leaf, parent);
			var route = new Queue<DungeonWMoves>();
			while (node != null)
			{
				route.Enqueue(node.Value);
				node = node.Parent;
			}
			return route;
		}

		public static List<Queue<DungeonWMoves>> solveGameWithMoves(int[,] dungeon)
		{
			Queue<TreeNode<DungeonWMoves>> states = new Queue<TreeNode<DungeonWMoves>>();
			DungeonWMoves dungeonWMoves = new DungeonWMoves(dungeon.Clone() as int[,], "Start", (0,0));
			states.Enqueue(new TreeNode<DungeonWMoves>(dungeonWMoves));
			
			var memory = new List<int>
			{
				HashDungeon(dungeon)
			};
			
			memory.Add(HashDungeon(dungeon));

			List<Queue<DungeonWMoves>> solutions = new List<Queue<DungeonWMoves>>();

			while (states.Count > 0)
			{
				var currentState = states.Dequeue();
				var currentDungeon = currentState.Value;

				foreach (var move in Mechanics.MOVES)
				{
					int[,] newDungeon = currentDungeon.dungeon.Clone() as int[,];
					string movement;
					(newDungeon, movement) = Mechanics.StepWithMoves(newDungeon, move);
					DungeonWMoves newDungeonM = new DungeonWMoves(newDungeon, movement,move);

					if (Mechanics.Win(newDungeon))
					{
						solutions.Add(GetRouteWMoves(newDungeonM, currentState));
					}
					else
					{
						setStateWithMoves(states, memory, newDungeonM, currentState);
					}
				}
			}
			return solutions;
		}
		public static DungeonWMoves[] getBestSolution(List<Queue<DungeonWMoves>> solutions){
			int nSolMin=0;
			Queue<DungeonWMoves> bestSolution = new Queue<DungeonWMoves>();
			foreach(var solution in solutions){
				int aux = solution.ToArray().Length;
				if(aux < nSolMin || nSolMin == 0 ){
					nSolMin = aux;
					bestSolution = solution;
				}
			}
			DungeonWMoves[] reversSolution= bestSolution.ToArray();
			Array.Reverse(reversSolution);
			return reversSolution;
		}
		
		
	}

}
