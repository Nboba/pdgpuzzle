using System;
using System.Linq;

namespace WebApplication1.MechanicsClass
{
	public static class Mechanics
{
	// Moves
	public static readonly (int, int) RIGHT = (0, 1);
	public static readonly (int, int) LEFT = (0, -1);
	public static readonly (int, int) UP = (-1, 0);
	public static readonly (int, int) DOWN = (1, 0);
	public static readonly (int, int) STAY = (0, 0);

	public static readonly (int, int)[] MOVES = { RIGHT, LEFT, UP, DOWN };

	// Entities
	public static int EMPTY = 0;
	public static int WALL = 1;
	public static int ENEMY = 3;
	public static int BLOCK = 2;
	public static int DOOR = 4;
	public static int PLAYER = 5;

	// Functions
	public static (int, int) GetPlayer(int[,] dungeon)
	{
		for (int i = 0; i < dungeon.GetLength(0); i++)
		{
			for (int j = 0; j < dungeon.GetLength(1); j++)
			{
				if (dungeon[i, j] == PLAYER)
				{
					return (i, j);
				}
			}
		}
		return (-1, -1);
	}

	public static ((int, int), int) LookAhead(int[,] dungeon, (int, int) move)
	{
		var player = GetPlayer(dungeon);
		var tile = (player.Item1 + move.Item1, player.Item2 + move.Item2);
		var entity = dungeon[tile.Item1, tile.Item2];
		return (tile, entity);
	}

	public static int[,] IceSliding(int[,] dungeon, (int, int) move)
	{
		while (true)
		{
			var (tile, entity) = LookAhead(dungeon, move);
			if (entity == EMPTY)
			{
				var player = GetPlayer(dungeon);
				dungeon[player.Item1, player.Item2] = EMPTY;
				dungeon[tile.Item1, tile.Item2] = PLAYER;
			}
			else
			{
				break;
			}
		}
		return dungeon;
	}

	public static int[,] KillEnemy(int[,] dungeon, (int, int) enemy)
	{
		dungeon[enemy.Item1, enemy.Item2] = EMPTY;
		return dungeon;
	}

	public static int[,] Step(int[,] dungeon, (int, int) move)
	{
		var (tile, entity) = LookAhead(dungeon, move);
		if (entity == EMPTY)
		{
			dungeon = IceSliding(dungeon, move);
		}
		else if (entity == ENEMY)
		{
			dungeon = KillEnemy(dungeon, tile);
		}
		return dungeon;
	}

	public static bool Win(int[,] dungeon)
	{
		if (Enumerable.Range(0, dungeon.GetLength(0)).Any(i => Enumerable.Range(0, dungeon.GetLength(1)).Any(j => dungeon[i, j] == ENEMY)))
		{
			return false;
		}

		foreach (var move in MOVES)
		{
			var (_, entity) = LookAhead(dungeon, move);
			if (entity == DOOR) return true;
		}

		return false;
	}

	public static string GetMove((int, int) move)
	{
		if (move == RIGHT) return "RIGHT";
		if (move == LEFT) return "LEFT";
		if (move == UP) return "UP";
		return "DOWN";
	}

	public static (int[,], string) StepWithMoves(int[,] dungeon, (int, int) move)
	{
		string text = "";
		var (tile, entity) = LookAhead(dungeon, move);
		if (entity == EMPTY)
		{
			dungeon = IceSliding(dungeon, move);
			text = $"Move {GetMove(move)}";
		}
		else if (entity == ENEMY)
		{
			dungeon = KillEnemy(dungeon, tile);
			text = $"Kill {GetMove(move)}";
		}
		return (dungeon, text);
	}
}


}
