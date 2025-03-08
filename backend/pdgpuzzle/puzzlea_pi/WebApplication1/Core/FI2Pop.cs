using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.MechanicsClass;
using WebApplication1.SSolver;
namespace WebApplication1.fi2pop{


public class Individual
{
	public int[,] Solution { get; }
	public double Fitness { get; }
	public int NSol { get; }
	public int MinMoves { get; }

	public Individual(int[,] solution, double fitness, int nSol, int minMoves)
	{
		Solution = solution;
		Fitness = fitness;
		NSol = nSol;
		MinMoves = minMoves;
	}
}

public class FI2Pop
{
	private static readonly Random random = new Random();

	public static double Fitness(int nSol, int minMoves,int maxMoves, double w1 = 1, double w2 = 1)
	{
		int aux = maxMoves - minMoves ;
		if(aux > 0 ){
			return w2 * minMoves - w1 * nSol;
		}
		else{
			return w1 * nSol - w2 * minMoves ;
		}
		
	}

	public static bool IsFeasible(int nSol)
	{
		return nSol > 0;
	}

	public static (int[,], int[,]) RepairDoors(int[,] child1, int[,] child2)
	{
		var doors1 = GetPositions(child1, Mechanics.DOOR);
		var doors2 = GetPositions(child2, Mechanics.DOOR);

		if (doors1.Count == 2)
		{
			var door2 = doors1[random.Next(doors1.Count)];
			child1[door2.Item1, door2.Item2] = Mechanics.WALL;
			child2[door2.Item1, door2.Item2] = Mechanics.DOOR;
		}
		else if (doors2.Count == 2)
		{
			var door2 = doors2[random.Next(doors2.Count)];
			child2[door2.Item1, door2.Item2] = Mechanics.WALL;
			child1[door2.Item1, door2.Item2] = Mechanics.DOOR;
		}
		return (child1, child2);
	}

	public static (int[,], int[,]) RepairPlayer(int[,] child1, int[,] child2)
	{
		var players1 = GetPositions(child1, Mechanics.PLAYER);
		var players2 = GetPositions(child2, Mechanics.PLAYER);

		if (players1.Count == 2)
		{
			var player2 = players1[random.Next(players1.Count)];
			child1[player2.Item1, player2.Item2] = Mechanics.EMPTY;
			child2[player2.Item1, player2.Item2] = Mechanics.PLAYER;
		}
		else if (players2.Count == 2)
		{
			var player2 = players2[random.Next(players2.Count)];
			child2[player2.Item1, player2.Item2] = Mechanics.EMPTY;
			child1[player2.Item1, player2.Item2] = Mechanics.PLAYER;
		}
		return (child1, child2);
	}

	public static (int[,], int[,]) Crossover(int[,] parent1, int[,] parent2)
	{
		int m = parent1.GetLength(0);
		int n = parent1.GetLength(1);
		int[,] child1, child2;

		if (random.NextDouble() < 0.5) // 50% probability for rows
		{
			int rowIdx = random.Next(m);
			child1 = ConcatArraysVertically(parent1, parent2, rowIdx);
			child2 = ConcatArraysVertically(parent2, parent1, rowIdx);
		}
		else // 50% probability for columns
		{
			int colIdx = random.Next(n);
			child1 = ConcatArraysHorizontally(parent1, parent2, colIdx);
			child2 = ConcatArraysHorizontally(parent2, parent1, colIdx);
		}

		(child1, child2) = RepairDoors(child1, child2);
		(child1, child2) = RepairPlayer(child1, child2);

		return (child1, child2);
	}

	public static List<(int, int)> GetAdjacentWalls(int[,] dungeon)
	{
		var walls = GetPositions(dungeon, Mechanics.WALL);
		var adjacentWalls = new List<(int, int)>();

		foreach (var (i, j) in walls)
		{
			if ((i > 0 && dungeon[i - 1, j] == Mechanics.EMPTY) ||
				(i < dungeon.GetLength(0) - 1 && dungeon[i + 1, j] == Mechanics.EMPTY) ||
				(j > 0 && dungeon[i, j - 1] == Mechanics.EMPTY) ||
				(j < dungeon.GetLength(1) - 1 && dungeon[i, j + 1] == Mechanics.EMPTY))
			{
				adjacentWalls.Add((i, j));
			}
		}

		return adjacentWalls;
	}

	public static int[,] Mutate(int[,] dungeon,double mutationFactor)
	{
		var tiles = GetPositions(dungeon, tile => tile != Mechanics.WALL && tile != Mechanics.EMPTY);
		var tile = tiles[random.Next(tiles.Count)];
		int mutateTile = dungeon[tile.Item1, tile.Item2];

		if (mutateTile == Mechanics.DOOR)
		{
			var walls = GetAdjacentWalls(dungeon);
			var newDoor = walls[random.Next(walls.Count)];
			dungeon[tile.Item1, tile.Item2] = Mechanics.WALL;
			dungeon[newDoor.Item1, newDoor.Item2] = Mechanics.DOOR;
		}
		else if (random.NextDouble() <= mutationFactor && (mutateTile == Mechanics.ENEMY || mutateTile == Mechanics.BLOCK))
		{
			dungeon[tile.Item1, tile.Item2] = mutateTile == Mechanics.ENEMY ? Mechanics.BLOCK : Mechanics.ENEMY;
		}
		else
		{
			var emptys = GetPositions(dungeon, Mechanics.EMPTY);
			var newEntity = emptys[random.Next(emptys.Count)];
			dungeon[tile.Item1, tile.Item2] = Mechanics.EMPTY;
			dungeon[newEntity.Item1, newEntity.Item2] = mutateTile == Mechanics.PLAYER ? Mechanics.PLAYER : (random.NextDouble() < 0.5 ? Mechanics.ENEMY : Mechanics.BLOCK);
		}

		return dungeon;
	}

	public static int[,] TournamentSelection(Individual[] feapop, Individual[] infpop, bool mutation = false)
	{
		Individual Tournament(Individual[] population)
		{
			int k = 3;
			var contestants = population.OrderBy(x => random.Next()).Take(k).ToArray();
			return contestants.OrderByDescending(x => x.Fitness).First();
		}

		var parent1 = Tournament(feapop);

		if (mutation) return parent1.Solution;

		feapop = feapop.Where(x => x != parent1).ToArray();

		var parent2 = Tournament(feapop.Concat(infpop).ToArray());

		return parent1.Solution;
	}

	public static (Individual[], Individual[]) InitialPopulation(int[][,] population, double limit,int maxMoves)
	{
		var feapop = new List<Individual>();
		var infpop = new List<Individual>();

		foreach (var dungeon in population)
		{
			var (nSol, minMoves) = Solver.NSolutions(dungeon, limit);
			var fitnessScore = Fitness(nSol, minMoves,maxMoves);

			if (IsFeasible(nSol))
			{
				feapop.Add(new Individual(dungeon, fitnessScore, nSol, minMoves));
			}
			else
			{
				infpop.Add(new Individual(dungeon, fitnessScore, nSol, minMoves));
			}
		}

		return (feapop.ToArray(), infpop.ToArray());
	}

	public static Individual[] Elitism(Individual[] population, int nPop)
	{
		return population.OrderByDescending(x => x.Fitness).Take(nPop).ToArray();
	}

	public static (int[,], int, int) RunFI2Pop(int[][,] population, int maxIter, int nPop, double mutationFactor, int maxMoves, double limit)
	{
		var (feapop, infpop) = InitialPopulation(population, limit,maxMoves);
		int it = 0;

		while (true)
		{
			var feaoffspring = new List<Individual>();
			var infoffspring = new List<Individual>();

			while (feaoffspring.Count < nPop || infoffspring.Count < nPop)
			{
				var offspring = new List<int[,]>();

				if (random.NextDouble() < mutationFactor)
				{
					var dungeon = TournamentSelection(feapop, infpop, true);
					dungeon = Mutate((int[,])dungeon.Clone(), mutationFactor);
					offspring.Add(dungeon);
				}
				else
				{
					var parent1 = TournamentSelection(feapop, infpop, false);
					var parent2 = TournamentSelection(feapop, infpop, false);
					var (child1, child2) = Crossover(parent1, parent2);

					if (random.NextDouble() < mutationFactor)
					{
						child1 = Mutate((int[,])child1.Clone(), mutationFactor);
						child2 = Mutate((int[,])child2.Clone(), mutationFactor);
					}

					offspring.Add(child1);
					offspring.Add(child2);
				}

				foreach (var dungeon in offspring)
				{
					var (nSol, minMoves) = Solver.NSolutions(dungeon, limit);
					var fitnessScore = Fitness(nSol, minMoves,maxMoves);

					if (IsFeasible(nSol) && feaoffspring.Count < nPop)
					{
						feaoffspring.Add(new Individual(dungeon, fitnessScore, nSol, minMoves));
					}
					else if (infoffspring.Count < nPop)
					{
						infoffspring.Add(new Individual(dungeon, fitnessScore, nSol, minMoves));
					}
				}
			}

			feapop = feapop.Concat(feaoffspring).ToArray();
			infpop = infpop.Concat(infoffspring).ToArray();

			feapop = Elitism(feapop, nPop);
			infpop = Elitism(infpop, nPop);

			it++;

			if (feapop[0].MinMoves == maxMoves || it > maxIter) break;
		}

		return (feapop[0].Solution, feapop[0].NSol, feapop[0].MinMoves);
	}

	private static int[,] ConcatArraysVertically(int[,] array1, int[,] array2, int rowIdx)
	{
		int[,] result = new int[array1.GetLength(0), array1.GetLength(1)];

		for (int i = 0; i < rowIdx; i++)
		{
			for (int j = 0; j < array1.GetLength(1); j++)
			{
				result[i, j] = array1[i, j];
			}
		}

		for (int i = rowIdx; i < array2.GetLength(0); i++)
		{
			for (int j = 0; j < array2.GetLength(1); j++)
			{
				result[i, j] = array2[i, j];
			}
		}

		return result;
	}

	private static int[,] ConcatArraysHorizontally(int[,] array1, int[,] array2, int colIdx)
	{
		int[,] result = new int[array1.GetLength(0), array1.GetLength(1)];

		for (int i = 0; i < array1.GetLength(0); i++)
		{
			for (int j = 0; j < colIdx; j++)
			{
				result[i, j] = array1[i, j];
			}
		}

		for (int i = 0; i < array2.GetLength(0); i++)
		{
			for (int j = colIdx; j < array2.GetLength(1); j++)
			{
				result[i, j] = array2[i, j];
			}
		}

		return result;
	}

	private static List<(int, int)> GetPositions(int[,] array, int value)
	{
		var positions = new List<(int, int)>();
		for (int i = 0; i < array.GetLength(0); i++)
		{
			for (int j = 0; j < array.GetLength(1); j++)
			{
				if (array[i, j] == value)
				{
					positions.Add((i, j));
				}
			}
		}
		return positions;
	}

	private static List<(int, int)> GetPositions(int[,] array, Func<int, bool> predicate)
	{
		var positions = new List<(int, int)>();
		for (int i = 0; i < array.GetLength(0); i++)
		{
			for (int j = 0; j < array.GetLength(1); j++)
			{
				if (predicate(array[i, j]))
				{
					positions.Add((i, j));
				}
			}
		}
		return positions;
	}
}

}
