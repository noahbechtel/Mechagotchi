import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quagga from 'quagga'
import { setCode } from '../store/info'
import adapter from 'webrtc-adapter'

class Camera extends Component {
  constructor () {
    super()
    this.state = {
      result: 'None',
      done: false
    }
  }

  componentDidMount () {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#cameraViewport'),
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: 'environment',
            aspectRatio: { min: 1, max: 2 }
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
          readers: [
            'upc_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader'
          ]
        },
        locate: true
      },
      function (err) {
        if (err) {
          console.log(err)
          return
        }
        Quagga.start()
        console.log('Initialization finished. Ready to start')
      }
    )
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay

      var drawingCanvas = Quagga.canvas.dom.overlay

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height'))
          )
          result.boxes
            .filter(function (box) {
              return box !== result.box
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              })
            })
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          })
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 }
          )

          submit(result.codeResult.code)
        }
      }
    })

    const sleep = miliseconds => {
      var currentTime = new Date().getTime()

      while (currentTime + miliseconds >= new Date().getTime()) {}
    }
    let i = 0
    const submit = async result => {
      if (i > 20) {
        this.props.setCode(result)
        this.props.history.push('/home')
        Quagga.stop()
      } else {
        i++
      }
    }
  }
  render () {
    return (
      <div>
        <div id='cameraViewport' />

        <div className='hanger'>
          <button
            onClick={() => {
              Quagga.stop()
              this.props.history.push('/home')
            }}
          >
            Back
          </button>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    setCode (code) {
      dispatch(setCode(code))
    }
  }
}

export const ConnectedCamera = connect(
  null,
  mapDispatch
)(Camera)

export default ConnectedCamera
