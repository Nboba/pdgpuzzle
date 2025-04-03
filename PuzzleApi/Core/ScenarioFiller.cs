using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication1.MechanicsClass;

namespace WebApplication1.ScenarioFille{
	public static class ScenarioFiller
{
	static Random random = new Random();

	public static int[,] SetRandomPlayer(int[,] dungeon)
	{
		var empty = GetPositions(dungeon, Mechanics.EMPTY);
		var player = empty[random.Next(empty.Count)];
		dungeon[player.Item1, player.Item2] = Mechanics.PLAYER;
		return dungeon;
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

	public static int[,] SetDoor(int[,] dungeon)
	{
		var allowDoorPosition = GetAdjacentWalls(dungeon);
		var door = allowDoorPosition[random.Next(allowDoorPosition.Count)];
		dungeon[door.Item1, door.Item2] = Mechanics.DOOR;
		return dungeon;
	}

	public static int[,] SetBlocksAndEnemies(int[,] dungeon, double enemyFactor, double blockFactor)
	{
		var empty = GetPositions(dungeon, Mechanics.EMPTY);
		int nEmpty = empty.Count;
		int nEnemies = (int)(nEmpty * enemyFactor);
		int nBlocks = (int)(nEmpty * blockFactor);

		for (int i = 0; i < nEnemies; i++)
		{
			var enemy = empty[random.Next(empty.Count)];
			dungeon[enemy.Item1, enemy.Item2] = Mechanics.ENEMY;
			empty = GetPositions(dungeon, Mechanics.EMPTY);
		}

		for (int i = 0; i < nBlocks; i++)
		{
			var block = empty[random.Next(empty.Count)];
			dungeon[block.Item1, block.Item2] = Mechanics.BLOCK;
			empty = GetPositions(dungeon, Mechanics.EMPTY);
		}

		return dungeon;
	}

	public static int[,] GetInitialSolution(int[,] dungeon, double enemyFactor, double blockFactor)
	{
		dungeon = SetRandomPlayer(dungeon);
		dungeon = SetDoor(dungeon);
		dungeon = SetBlocksAndEnemies(dungeon, enemyFactor, blockFactor);
		return dungeon;
	}

	public static int[,] ScenarioFillerMethod(int n, int m, double expansionFactor)
	{
		while (true)
		{
			var dungeon = new int[n, m];

			// Fill the contour with walls
			for (int i = 0; i < n; i++)
			{
				dungeon[i, 0] = Mechanics.WALL;
				dungeon[i, m - 1] = Mechanics.WALL;
			}

			for (int j = 0; j < m; j++)
			{
				dungeon[0, j] = Mechanics.WALL;
				dungeon[n - 1, j] = Mechanics.WALL;
			}

			int maxExpansionLength = Math.Min(n, m) / 4;

			for (int step = 0; step <= maxExpansionLength; step++)
			{
				var indicesToExpand = GetPositions(dungeon, Mechanics.WALL);
				foreach (var (row, col) in indicesToExpand)
				{
					if (random.NextDouble() < expansionFactor)
					{
						if (row > 0 && dungeon[row - 1, col] == Mechanics.EMPTY)
						{
							dungeon[row - 1, col] = Mechanics.WALL;
						}
						if (row < n - 1 && dungeon[row + 1, col] == Mechanics.EMPTY)
						{
							dungeon[row + 1, col] = Mechanics.WALL;
						}
						if (col > 0 && dungeon[row, col - 1] == Mechanics.EMPTY)
						{
							dungeon[row, col - 1] = Mechanics.WALL;
						}
						if (col < m - 1 && dungeon[row, col + 1] == Mechanics.EMPTY)
						{
							dungeon[row, col + 1] = Mechanics.WALL;
						}
					}
				}
			}

			if (IsValidMatrix(dungeon))
			{
				return dungeon;
			}
		}
	}

	private static bool IsValidMatrix(int[,] dungeon)
	{
		int n = dungeon.GetLength(0);
		int m = dungeon.GetLength(1);
		var visited = new bool[n, m];

		void FloodFill(int r, int c)
		{
			var stack = new Stack<(int, int)>();
			stack.Push((r, c));

			while (stack.Count > 0)
			{
				var (currentR, currentC) = stack.Pop();

				if (currentR < 0 || currentR >= n || currentC < 0 || currentC >= m)
					continue;
				if (visited[currentR, currentC] || dungeon[currentR, currentC] != Mechanics.EMPTY)
					continue;

				visited[currentR, currentC] = true;

				stack.Push((currentR + 1, currentC)); // down
				stack.Push((currentR - 1, currentC)); // up
				stack.Push((currentR, currentC + 1)); // right
				stack.Push((currentR, currentC - 1)); // left
			}
		}

		for (int i = 0; i < n; i++)
		{
			for (int j = 0; j < m; j++)
			{
				if (dungeon[i, j] == Mechanics.EMPTY)
				{
					FloodFill(i, j);
					break;
				}
			}
		}

		for (int i = 0; i < n; i++)
		{
			for (int j = 0; j < m; j++)
			{
				if (dungeon[i, j] == Mechanics.EMPTY && !visited[i, j])
				{
					return false;
				}
			}
		}

		return true;
	}

	private static List<(int, int)> GetPositions(int[,] dungeon, int value)
	{
		var positions = new List<(int, int)>();
		for (int i = 0; i < dungeon.GetLength(0); i++)
		{
			for (int j = 0; j < dungeon.GetLength(1); j++)
			{
				if (dungeon[i, j] == value)
				{
					positions.Add((i, j));
				}
			}
		}
		return positions;
	}
}
}
