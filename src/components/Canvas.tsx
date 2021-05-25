import * as React from 'react';
import { SketchField, Tools } from 'react-sketch';


export default function Canvas(props: any) {
  const canvasRef = React.useRef(null)
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])


  return (
    <>
      <SketchField
        className="canvas"
        width='1024px'
        height='768px'
        tool={Tools.Pencil}
        lineColor='black'
        lineWidth={3}
      />
    </>
  );
}