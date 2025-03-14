using Microsoft.AspNetCore.Mvc;
using WebApplication1.ScenarioFille;
using WebApplication1.Models;
using WebApplication1.fi2pop;
using WebApplication1.SSolver;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WebApplication1.Controllers;

[ApiController]
[Route("[controller]")]
public class PuzzleApiController : ControllerBase
{

    [HttpGet(Name = "GetDummyPuzzle")]
    public string Get() 
    {
        Petition petition = new();
        int[][,] population = new int[2 * petition.NPop][,];
        int[,] matrix = ScenarioFiller.ScenarioFillerMethod(petition.Height, petition.Width, petition.ExpantionFactor);
        for (int i = 0; i < 2 * petition.NPop; i++)
        {
            population[i] = ScenarioFiller.GetInitialSolution(matrix.Clone() as int[,], petition.EnemyFactor, petition.BlockFactor);
        }
        (int[,], int, int) dungeonData = FI2Pop.RunFI2Pop(population, petition.MaxIter, petition.NPop, petition.MutationFactor, petition.MaxMoves, 10);
        Puzzle puzzle = new();
        puzzle.Matrix = dungeonData.Item1;
        puzzle.NSolutions = dungeonData.Item2;
        puzzle.NMoves = dungeonData.Item3;
        puzzle.FindPlayerPosition().
               FindEnemyPosition().
               FindDoor().
               FindSolution();
        return JsonConvert.SerializeObject(new { puzzle  });
    }



    [HttpPost("GetNPuzzles")]
    public string GetNPuzzles([FromBody] Petition petition)
    {
        Console.WriteLine($"Se solicitaron {petition.Npuzzles} puzzles");


        List<Puzzle> response = new List<Puzzle>();
        for (int i = 0; i < petition.Npuzzles; i++)
        {
            int[][,] population = new int[2 * petition.NPop][,];
            int[,] matrix = ScenarioFiller.ScenarioFillerMethod(petition.Height, petition.Width, petition.ExpantionFactor);
            for (int j = 0; j < 2 * petition.NPop; j++)
            {
                population[j] = ScenarioFiller.GetInitialSolution(matrix.Clone() as int[,], petition.EnemyFactor, petition.BlockFactor);
            }
            (int[,], int, int) dungeonData = FI2Pop.RunFI2Pop(population, petition.MaxIter, petition.NPop, petition.MutationFactor, petition.MaxMoves, 10);
            Puzzle puzzle = new();
            puzzle.Matrix = dungeonData.Item1;
            puzzle.NSolutions = dungeonData.Item2;
            puzzle.NMoves = dungeonData.Item3 - 1;
            puzzle.FindPlayerPosition().
                   FindEnemyPosition().
                   FindDoor().
                   FindSolution();
            response.Add( puzzle );

        }
        return JsonConvert.SerializeObject(new { response });
    }

}
