"use client";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { cx } from "cva";
import {
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Confetti from "react-confetti";

type Position = {
  x: number;
  y: number;
};

type PreviousPosition = Position & {
  direction: {
    dx: number;
    dy: number;
  };
};

type Direction = "up" | "left" | "right" | "down";

type MazeType = number[][];

const Maze = ({
  maze,
  size,
  playerPosition,
  solution,
  previousPositions,
  endPosition,
}: {
  maze: MazeType;
  size: number;
  playerPosition: Position;
  previousPositions: PreviousPosition[];
  endPosition: Position;
  solution: Position[];
}) => {
  return (
    <div
      id="maze-container"
      style={{
        gridTemplateColumns: `repeat(${size}, var(--cell-size))`,
        gridTemplateRows: `repeat(${size}, var(--cell-size))`,
      }}
    >
      {maze.map((row, y) =>
        row.map((cellValue, x) => {
          const isStart = x === 0 && y === 0;
          const isEnd = x === endPosition.x && y === endPosition.y;
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const isSolution = solution.some((pos) => pos.x === x && pos.y === y);
          const previousPositionIndex = previousPositions.findIndex(
            (pos) => pos.x === x && pos.y === y,
          );
          const isPrevious = previousPositions[previousPositionIndex];
          const previousToMe = isPlayer
            ? previousPositions[previousPositions.length - 1]
            : !isStart
              ? previousPositions[previousPositionIndex - 1]
              : null;
          const afterMe = isPlayer
            ? null
            : previousPositionIndex > -1
              ? previousPositions[previousPositionIndex + 1]
              : null;
          const isLastPreviousPosition = afterMe === undefined;

          const dx = isPrevious?.direction?.dx;
          const dy = isPrevious?.direction?.dy;

          return (
            <div
              key={`${x}-${y}`}
              className={cx(
                "cell",
                isStart && "bg-green-600",
                isEnd && "bg-red-600",
                isSolution && "bg-green-400",
                isPlayer && "player",
                addWallsClasses(cellValue),
              )}
              data-x={x}
              data-y={y}
            >
              <span
                className={`${cx(
                  (isPrevious || isPlayer) &&
                    !isStart &&
                    previousToMe?.direction.dx === 1 &&
                    "right-hand",
                  (isPrevious || isPlayer) &&
                    !isStart &&
                    previousToMe?.direction.dx === -1 &&
                    "left-hand",
                  (isPrevious || isPlayer) &&
                    !isStart &&
                    previousToMe?.direction.dy === 1 &&
                    "bottom-hand",
                  (isPrevious || isPlayer) &&
                    !isStart &&
                    previousToMe?.direction.dy === -1 &&
                    "top-hand",
                  Boolean(
                    Boolean(afterMe && afterMe.y > y) ||
                      Boolean(isLastPreviousPosition && dy === 1),
                  ) && "to-bottom",
                  Boolean(
                    Boolean(afterMe && afterMe.y < y) ||
                      Boolean(isLastPreviousPosition && dy === -1),
                  ) && "to-top",

                  Boolean(
                    Boolean(afterMe && afterMe.x > x) ||
                      Boolean(isLastPreviousPosition && dx === 1),
                  ) && "to-right",
                  Boolean(
                    Boolean(afterMe && afterMe.x < x) ||
                      Boolean(isLastPreviousPosition && dx === -1),
                  ) && "to-left",
                )}`}
              />
            </div>
          );
        }),
      )}
    </div>
  );
};

const addWallsClasses = (value: number) => {
  const classes = [];
  if (value & 1) classes.push("left");
  if (value & 2) classes.push("top");
  if (value & 4) classes.push("right");
  if (value & 8) classes.push("bottom");
  return classes;
};

const Laberinto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [size, setSize] = useState(10);
  const [maze, setMaze] = useState<MazeType>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [previousPositions, setPreviousPositions] = useState<
    {
      x: number;
      y: number;
      direction: {
        dx: number;
        dy: number;
      };
    }[]
  >([]);
  const [solution, setSolution] = useState<Position[]>([]);
  const [playerCanMove, setPlayerCanMove] = useState(true);

  const endPosition = useMemo(() => {
    return {
      x: size - 1,
      y: size - 1,
    };
  }, [size]);

  const resetMaze = useCallback((newMaze: MazeType, canMove: boolean) => {
    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 0 });
    setSolution([]);
    setPlayerCanMove(canMove);
    setPreviousPositions([]);
    setShowConfetti(false);
  }, []);

  const handleGenerateMaze = () => {
    const newMaze = generateMaze(size);
    resetMaze(newMaze, true);
  };

  const handleSolveMaze = () => {
    setPlayerCanMove(false);
    const solutionPath = solveMaze(maze, size);
    setSolution(solutionPath);
    // animateSolution(solutionPath);
  };

  const handleVictory = useCallback(() => {
    setShowConfetti(true);
    setPlayerCanMove(false);
  }, []);

  const handleMove = useCallback(
    (direction: Direction) => {
      if (playerCanMove) {
        const directionMap: Record<Direction, { dx: number; dy: number }> = {
          up: { dx: 0, dy: -1 },
          down: { dx: 0, dy: 1 },
          left: { dx: -1, dy: 0 },
          right: { dx: 1, dy: 0 },
        };
        const move = directionMap[direction];
        if (move) {
          const newX = playerPosition.x + move.dx;
          const newY = playerPosition.y + move.dy;

          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < size &&
            newY < size &&
            canMove(maze[playerPosition.y][playerPosition.x], move.dx, move.dy)
          ) {
            setPlayerPosition({ x: newX, y: newY });
            setPreviousPositions((prev) => {
              const isBacktracking =
                prev.length > 0 &&
                prev[prev.length - 1].x === newX &&
                prev[prev.length - 1].y === newY;

              if (isBacktracking) {
                return prev.slice(0, -1); // Retrocede eliminando el último
              } else {
                return [
                  ...prev,
                  {
                    ...playerPosition,
                    direction: {
                      dx: move.dx,
                      dy: move.dy,
                    },
                  },
                ]; // Agrega la posición anterior al historial
              }
            });

            if (newX === endPosition.x && newY === endPosition.y) {
              handleVictory();
            }
          }
        }
      }
    },
    [
      endPosition.x,
      endPosition.y,
      handleVictory,
      maze,
      playerCanMove,
      playerPosition,
      size,
    ],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const directionMap: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const direction = directionMap[event.key as keyof typeof directionMap];
      if (direction) handleMove(direction);
    },
    [handleMove],
  );

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("keydown", handleKeyDown);
    return () => {
      container?.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerCanMove, playerPosition, maze, handleKeyDown]);
  useEffect(() => {
    const initialMaze = generateMaze(size);
    resetMaze(initialMaze, true);
  }, [resetMaze, size]);

  return (
    <div
      className="flex flex-col justify-center items-center min-h-full"
      ref={containerRef}
    >
      <Confetti
        numberOfPieces={showConfetti ? 500 : 0}
        onConfettiComplete={(instance) => {
          setShowConfetti(false);
          instance?.reset();
        }}
        recycle={false}
      />
      <div className="flex justify-center gap-2 items-center mb-4 flex-col md:flex-row">
        <div>
          <Select
            value={size.toString()}
            onValueChange={(v) => {
              setSize(parseInt(v));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona dificultad" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Dificultad</SelectLabel>

                <SelectItem value="5">Facil</SelectItem>
                <SelectItem value="10">Medio</SelectItem>
                <SelectItem value="15">Dificil</SelectItem>
                <SelectItem value="30">Imposible</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerateMaze}>Generar laberinto</Button>
        <Button onClick={handleSolveMaze}>Resolver laberinto</Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Maze
          maze={maze}
          size={size}
          playerPosition={playerPosition}
          solution={solution}
          previousPositions={previousPositions}
          endPosition={endPosition}
        />
      </div>

      <div className="mt-4 flex justify-center items-end gap-4 ">
        <Button
          size="icon"
          variant="outline"
          className="rounded-sm size-11"
          aria-label="Move left"
          onClick={() => handleMove("left")}
        >
          <MoveLeftIcon />
        </Button>
        <div className="flex flex-col gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-sm size-11"
            aria-label="Move up"
            onClick={() => handleMove("up")}
          >
            <MoveUpIcon />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-sm size-11"
            aria-label="Move down"
            onClick={() => handleMove("down")}
          >
            <MoveDownIcon />
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="rounded-sm size-11"
          aria-label="Move right"
          onClick={() => handleMove("right")}
        >
          <MoveRightIcon />
        </Button>
      </div>
    </div>
  );
};

// Funciones auxiliares
function generateMaze(size: number) {
  const maze = Array.from({ length: size }, () => Array(size).fill(15));
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const walls: {
    x: number;
    y: number;
    direction: "left" | "right" | "up" | "down";
  }[] = [];

  function addWalls(x: number, y: number) {
    if (x > 0 && !visited[y][x - 1]) walls.push({ x, y, direction: "left" });
    if (x < size - 1 && !visited[y][x + 1])
      walls.push({ x, y, direction: "right" });
    if (y > 0 && !visited[y - 1][x]) walls.push({ x, y, direction: "up" });
    if (y < size - 1 && !visited[y + 1][x])
      walls.push({ x, y, direction: "down" });
  }

  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  visited[y][x] = true;
  addWalls(x, y);

  while (walls.length > 0) {
    const { x, y, direction } = walls.splice(
      Math.floor(Math.random() * walls.length),
      1,
    )[0];

    let nx = x,
      ny = y;
    if (direction === "left") nx--;
    if (direction === "right") nx++;
    if (direction === "up") ny--;
    if (direction === "down") ny++;

    if (nx >= 0 && ny >= 0 && nx < size && ny < size && !visited[ny][nx]) {
      visited[ny][nx] = true;

      if (direction === "left") {
        maze[y][x] &= ~1;
        maze[ny][nx] &= ~4;
      } else if (direction === "right") {
        maze[y][x] &= ~4;
        maze[ny][nx] &= ~1;
      } else if (direction === "up") {
        maze[y][x] &= ~2;
        maze[ny][nx] &= ~8;
      } else if (direction === "down") {
        maze[y][x] &= ~8;
        maze[ny][nx] &= ~2;
      }

      addWalls(nx, ny);
    }
  }

  return maze;
}

function solveMaze(maze: MazeType, size: number): Position[] {
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  const start = { x: 0, y: 0 };
  const end = { x: size - 1, y: size - 1 };
  const queue = [[start]];
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  visited[0][0] = true;

  while (queue.length) {
    const path = queue.shift()!;
    const { x, y } = path[path.length - 1];

    if (x === end.x && y === end.y) {
      return path;
    }

    for (const { x: dx, y: dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < size &&
        ny < size &&
        !visited[ny][nx] &&
        canMove(maze[y][x], dx, dy)
      ) {
        visited[ny][nx] = true;
        queue.push([...path, { x: nx, y: ny }]);
      }
    }
  }
  return [];
}

function canMove(cellValue: number, dx: number, dy: number) {
  if (dx === 1 && !(cellValue & 4)) return true;
  if (dx === -1 && !(cellValue & 1)) return true;
  if (dy === 1 && !(cellValue & 8)) return true;
  if (dy === -1 && !(cellValue & 2)) return true;
  return false;
}

// function animateSolution(solution: Position[]) {
//   let index = 0;
//
//   const interval = setInterval(() => {
//     if (index >= solution.length) {
//       clearInterval(interval);
//       return;
//     }
//     index++;
//   }, 100);
// }

export default Laberinto;
