import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Trophy, HelpCircle } from 'lucide-react';

const ProportionalityGame = () => {
  const levels = {
    1: [
      {
        question: "En una receta, por cada 2 huevos se usan 100 gramos de harina. ¿Cuántos gramos de harina necesitas si usas 6 huevos?",
        answer: 300,
        hint: "Si 2 huevos necesitan 100g, piensa cuántas veces 2 cabe en 6 y multiplica",
        explanation: "Como 6 huevos es 3 veces más que 2 huevos, necesitaremos 3 veces más harina: 3 × 100 = 300 gramos"
      },
      {
        question: "Cuatro estudiantes tardan 8 días en pintar un mural. Si ahora son 8 estudiantes, ¿cuántos días tardarán en pintarlo, si trabajan al mismo ritmo?",
        answer: 4,
        hint: "Si hay el doble de estudiantes, ¿el tiempo será mayor o menor?",
        explanation: "Como hay el doble de estudiantes, tardarán la mitad del tiempo: 8 ÷ 2 = 4 días"
      },
      {
        question: "Si 1 kilo de manzanas cuesta 3 euros, entonces 2 kilos cuestan 5 euros. ¿Es verdadero o falso? (0 para falso, 1 para verdadero)",
        answer: 0,
        hint: "Piensa en la relación entre kilos y precio. ¿Aumenta de manera proporcional?",
        explanation: "Falso. Si 1 kilo cuesta 3 euros, 2 kilos deberían costar 6 euros (el doble)"
      },
      {
        question: "Si por cada 5 lápices hay 3 gomas de borrar, ¿cuántas gomas habrá si tienes 15 lápices?",
        answer: 9,
        hint: "Si 5 lápices tienen 3 gomas, ¿cuántas veces 5 cabe en 15?",
        explanation: "Como 15 lápices es 3 veces 5 lápices, necesitaremos 3 veces más gomas: 3 × 3 = 9 gomas"
      }
    ],
    2: [
      {
        question: "En una tienda, por cada 4 camisetas que compras, te regalan 1 gorra. Si compras 12 camisetas, ¿cuántas gorras te regalarán?",
        answer: 3,
        hint: "Si 4 camisetas = 1 gorra, ¿cuántos grupos de 4 hay en 12?",
        explanation: "Como 12 camisetas son 3 grupos de 4, te regalarán 3 gorras"
      },
      {
        question: "Un coche recorre una distancia de 300 km. Si va a 100 km/h, tarda 3 horas. Si va a 150 km/h, ¿cuánto tiempo tardará?",
        answer: 2,
        hint: "Si aumenta la velocidad, ¿el tiempo será mayor o menor?",
        explanation: "Como la velocidad aumenta 1.5 veces, el tiempo será 1.5 veces menor: 3 ÷ 1.5 = 2 horas"
      },
      {
        question: "Si por cada 2 perros hay 1 correa, entonces por cada 6 perros hay 4 correas. ¿Es verdadero o falso? (0 para falso, 1 para verdadero)",
        answer: 0,
        hint: "Si 2 perros tienen 1 correa, ¿cuántas correas deberían tener 6 perros?",
        explanation: "Falso. Si 2 perros tienen 1 correa, 6 perros (3 veces más) deberían tener 3 correas"
      },
      {
        question: "Una fuente tarda 4 horas en llenar un estanque. Si se duplicara el caudal de la fuente, ¿cuánto tiempo tardaría en llenarlo?",
        answer: 2,
        hint: "Si el caudal es el doble, ¿el tiempo será mayor o menor?",
        explanation: "Como el caudal es el doble, tardará la mitad del tiempo: 4 ÷ 2 = 2 horas"
      }
    ],
    3: [
      {
        question: "En una excursión, cada estudiante paga 5 euros por entrada al museo. Si van 24 estudiantes, ¿cuánto dinero pagarán en total?",
        answer: 120,
        hint: "Multiplica el precio por entrada por el número de estudiantes",
        explanation: "El coste total será: 24 estudiantes × 5 euros = 120 euros"
      },
      {
        question: "Para regar un campo, 3 aspersores tardan 9 horas. Si se usan 6 aspersores, ¿cuánto tiempo tardarán?",
        answer: 4.5,
        hint: "Si duplicamos los aspersores, ¿cómo cambia el tiempo?",
        explanation: "Como hay el doble de aspersores, tardarán la mitad del tiempo: 9 ÷ 2 = 4.5 horas"
      },
      {
        question: "Una barra de pan cuesta 1,20 €. Si compras 5 barras de pan, ¿cuál es el coste total?",
        answer: 6,
        hint: "Multiplica el precio de una barra por el número total de barras",
        explanation: "El coste total será: 5 barras × 1,20 € = 6 euros"
      },
      {
        question: "Si por cada 3 kilos de manzanas se obtienen 2 litros de jugo, ¿cuántos litros obtendrás con 9 kilos?",
        answer: 6,
        hint: "Si 3 kilos dan 2 litros, ¿cuántas veces 3 cabe en 9?",
        explanation: "Como 9 kilos son 3 veces 3 kilos, obtendremos 3 veces más jugo: 3 × 2 = 6 litros"
      }
    ],
    4: [
      {
        question: "Una fábrica produce 150 botellas de agua en 2 horas. ¿Cuántas botellas producirá en 6 horas al mismo ritmo?",
        answer: 450,
        hint: "Si en 2 horas produce 150, en 6 horas (el triple de tiempo) producirá...",
        explanation: "Como 6 horas es 3 veces más tiempo, producirá 3 veces más botellas: 3 × 150 = 450 botellas"
      },
      {
        question: "Un tanque de agua se vacía en 10 horas usando una bomba. Si se conectan 2 bombas, ¿cuánto tiempo tardará en vaciarse?",
        answer: 5,
        hint: "Con el doble de bombas, ¿el tiempo será mayor o menor?",
        explanation: "Como hay el doble de bombas, tardará la mitad del tiempo: 10 ÷ 2 = 5 horas"
      },
      {
        question: "Si por cada 5 euros puedes comprar 2 entradas, entonces por 10 euros puedes comprar 5 entradas. ¿Es verdadero o falso? (0 para falso, 1 para verdadero)",
        answer: 0,
        hint: "Si 5 euros compran 2 entradas, el doble de dinero comprará...",
        explanation: "Falso. Si 5 euros compran 2 entradas, 10 euros (el doble) deberían comprar 4 entradas (el doble)"
      },
      {
        question: "Una receta indica que por cada litro de agua se añaden 200 gramos de azúcar. Si necesitas preparar 5 litros de esta mezcla, ¿cuántos gramos de azúcar necesitarás?",
        answer: 1000,
        hint: "Multiplica los gramos de azúcar por litro por el número total de litros",
        explanation: "Necesitarás 5 veces más azúcar: 5 × 200 = 1000 gramos"
      }
    ],
    5: [
      {
        question: "Una piscina se llena en 12 horas con una sola manguera. Si utilizas 3 mangueras, ¿en cuánto tiempo se llenará?",
        answer: 4,
        hint: "Con el triple de mangueras, ¿el tiempo será mayor o menor?",
        explanation: "Como hay el triple de mangueras, tardará un tercio del tiempo: 12 ÷ 3 = 4 horas"
      },
      {
        question: "Tres máquinas imprimen 120 folletos en 2 horas. Si se agregan 3 máquinas más, ¿cuánto tiempo tardarán en imprimir los mismos folletos?",
        answer: 1,
        hint: "Si duplicamos las máquinas, ¿cómo cambia el tiempo?",
        explanation: "Como hay el doble de máquinas, tardarán la mitad del tiempo: 2 ÷ 2 = 1 hora"
      },
      {
        question: "Si 4 camisetas cuestan 40 €, entonces 8 camisetas costarán 70 €. ¿Es verdadero o falso? (0 para falso, 1 para verdadero)",
        answer: 0,
        hint: "Si 4 camisetas cuestan 40 €, el doble de camisetas costará...",
        explanation: "Falso. Si 4 camisetas cuestan 40 €, 8 camisetas (el doble) deberían costar 80 € (el doble)"
      },
      {
        question: "Un tren recorre 180 km en 3 horas a una velocidad constante. Si recorre 240 km, ¿cuánto tiempo tardará?",
        answer: 4,
        hint: "Si la distancia aumenta, ¿el tiempo será mayor o menor?",
        explanation: "Como 240 km es 1.33 veces más que 180 km, tardará 1.33 veces más tiempo: 3 × (240/180) = 4 horas"
      }
    ],
    6: [
      {
        question: "Una carretera tiene 1.500 metros de longitud. ¿Cuántos kilómetros son? Si un coche recorre 60 km/h, ¿cuánto tiempo tardará en recorrer esta carretera?",
        answer: 0.025,
        hint: "Primero convierte metros a kilómetros (÷1000), luego divide la distancia por la velocidad",
        explanation: "1.500 metros = 1,5 km. A 60 km/h tardará: 1,5 ÷ 60 = 0,025 horas (1,5 minutos)"
      },
      {
        question: "Un mapa tiene una escala de 1:50.000. Si la distancia entre dos ciudades en el mapa es de 4 cm, ¿cuál es la distancia real en kilómetros?",
        answer: 2,
        hint: "Multiplica los cm por 50.000 y convierte a kilómetros",
        explanation: "4 cm × 50.000 = 200.000 cm = 2 km"
      },
      {
        question: "Un edificio mide 24 metros de altura. Si se utiliza un modelo a escala 1:100, ¿cuántos centímetros de altura tendrá el modelo?",
        answer: 24,
        hint: "Divide los metros por la escala y convierte a centímetros",
        explanation: "24 metros ÷ 100 = 0,24 metros = 24 centímetros"
      },
      {
        question: "Una bicicleta recorre 2.500 metros en 5 minutos. Expresa la velocidad media en kilómetros por hora.",
        answer: 30,
        hint: "Convierte metros a kilómetros y minutos a horas, luego divide",
        explanation: "2,5 km ÷ (5/60) horas = 2,5 × 12 = 30 km/h"
      }
    ]
  };

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [stats, setStats] = useState({
    totalAttempted: 0,
    firstTryCorrect: 0,
    multipleTriesCorrect: 0
  });
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    const currentProblemData = levels[currentLevel][currentProblem];
    const isCorrect = parseFloat(userAnswer) === currentProblemData.answer;
    
    setAttempts(prev => prev + 1);
    setStats(prev => ({...prev, totalAttempted: prev.totalAttempted + 1}));
    
    if (isCorrect) {
      if (attempts === 0) {
        setStats(prev => ({...prev, firstTryCorrect: prev.firstTryCorrect + 1}));
      } else {
        setStats(prev => ({...prev, multipleTriesCorrect: prev.multipleTriesCorrect + 1}));
      }
      
      setFeedback("¡Correcto! " + currentProblemData.explanation);
      setTimeout(nextProblem, 2000);
    } else {
      setFeedback("Intenta de nuevo. ¿Quieres una pista?");
    }
  };

  const nextProblem = () => {
    if (currentProblem < levels[currentLevel].length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else if (currentLevel < Object.keys(levels).length) {
      setCurrentLevel(prev => prev + 1);
      setCurrentProblem(0);
    }
    setUserAnswer('');
    setFeedback('');
    setShowHint(false);
    setAttempts(0);
  };

  return (
    <div className="