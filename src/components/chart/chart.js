import { useEffect, useRef } from "react";
import styledComponents from "styled-components";
import { useWindowResize } from "../../hooks/useWindowResize";

const CanvasCard = styledComponents.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 40px 10px;
  resize: horizontal;
  border-radius: 10px;
`;

const Types = styledComponents.div`
display: flex;
align-items: center;
margin-bottom: 30px;
`;

const TypesText = styledComponents.div`
margin-left: 10px;
font-size: 1.3em;
margin-right: 30px;
`;

export const Chart = ({ chart }) => {
  const canvasRef = useRef(null);

  const { width } = useWindowResize();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ROWS_COUNT = 5; // Количество значений на оси Y
    let COLUMNS_COUNT; // Количество значений по оси X

    if (width >= 1200) COLUMNS_COUNT = 15;
    else if (width <= 1200 && width >= 800) COLUMNS_COUNT = 10;
    else if (width <= 800) COLUMNS_COUNT = 5;

    const HEIGHT = 300; // Высота canvas
    const WIDTH = width - 100; // Ширина canvas

    const PADDING = 20; // Отступы от краев

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    //Отрисовка линии
    const line = (ctx, [x, y], color) => {
      ctx.strokeStyle = color;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    //Получение максимального и минимального числа из нескольких массивов
    const getMinMax = (arrays) => {
      let min = arrays[0][0];
      let max = arrays[0][0];

      arrays.forEach((arr) => {
        arr.forEach((el) => {
          if (el > max) max = el;
          if (el < min) min = el;
        });
      });
      return [min, max];
    };

    //Отрисовывает y линии графика
    const drawLinesGraph = () => {
      const chartsY = chart.columns.filter(
        (col) => chart.types[col[0]] === "line"
      ); // Оставляет только y линии графика

      const [min, max] = getMinMax(chartsY.map((el) => el.slice(1))); //Получаем максимальое и минимальное значение в массиве y координат

      const textStep = Math.floor((max - min) / ROWS_COUNT); // Одно деление графика по оси y в тексте
      const step = HEIGHT / ROWS_COUNT; // Одно деление по оси Y

      //Отрисовка линий
      for (let i = 0; i <= ROWS_COUNT; i++) {
        const y = i * step - PADDING;
        ctx.beginPath();
        ctx.moveTo(0, y);
        line(ctx, [WIDTH, y], "#bbb");
        ctx.fillText(i * textStep, 1, HEIGHT - y + 10);
        ctx.closePath();
      }
    };

    //Отрисовывает график
    const drawGraph = () => {
      const chartsY = chart.columns.filter(
        (col) => chart.types[col[0]] === "line"
      ); //Оставляет массив только с координатами по y

      chartsY.forEach((col) => {
        const stepX = Math.floor(WIDTH / (col.length - 1)); // Находим сколько по ширине будет одно x деление графика
        const coords = col.slice(1).map((el, i) => {
          return [i * stepX + 50, HEIGHT - el]; // Находим координаты, при этом двигаем график
        });

        //Рисуем сам график
        const draw = () => {
          ctx.beginPath();
          ctx.moveTo(30, HEIGHT - PADDING);
          coords.forEach((coordinate) => {
            line(ctx, coordinate, chart.colors[col[0]]);
          });
          ctx.closePath();
        };
        draw();
      });
    };

    // Отрисовка дат по оси x
    const drawXText = () => {
      const step = Math.round(WIDTH / COLUMNS_COUNT); // Сколько ширина между двумя линиями

      const xCoords = chart.columns
        .filter((el) => chart.types[el[0]] === "x")[0]
        .slice(1); // получаем массив с датами

      for (let i = 0; i < COLUMNS_COUNT; i++) {
        const xCoordinate = step * i;
        ctx.beginPath();
        ctx.moveTo(xCoordinate + 30, HEIGHT);
        line(ctx, [xCoordinate + 30, -HEIGHT], "#bbb");

        const date = new Date(
          xCoords[Math.round(i * (xCoords.length / COLUMNS_COUNT))] // берем каждый n-ный индекс массива с координатами, где n = длина массива/COLUMNS_COUNT
        );
        //Форматируем дату, так, что если например приходит число 9, то возвращается 09, а если 10, то 10
        const formatDate = (date) => (date > 10 ? date : `0${date}`);
        //вставляем текст
        ctx.fillText(
          date.getFullYear() +
            " " +
            formatDate(date.getMonth()) +
            " " +
            formatDate(date.getDay()),
          xCoordinate + 35,
          HEIGHT
        );
        ctx.closePath();
      }
    };

    drawXText();

    drawGraph();

    drawLinesGraph();
  }, [width]);

  return (
    <CanvasCard>
      <Types>
        {Object.keys(chart.colors).map((el) => (
          <Types>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: chart.colors[el],
                borderRadius: "5px",
              }}
            ></div>
            <TypesText>{el}</TypesText>
          </Types>
        ))}
      </Types>
      <canvas ref={canvasRef} width="900" height="300"></canvas>
    </CanvasCard>
  );
};
