import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quagga from 'quagga'
import { setCode } from '../store/info'
import history from '../history'

class Camera extends Component {
  constructor () {
    super()
    this.state = {
      pwa: false,
      result: ''
    }
  }

  async componentDidMount () {
    if (
      !window.matchMedia('(display-mode: standalone)').matches &&
      !!navigator.platform &&
      /iPad|iPhone|iPod/.test(navigator.platform)
    ) {
      this.setState({ pwa: true })
    } else {
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
    }

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

          this.handleSubmit(result.codeResult.code)
        }
      }
    })
  }

  handleSubmit = result => {
    Quagga.stop()
    this.props.setCode({ result, stock: this.props.stock })
  }
  handleSubmitPwa = evt => {
    evt.preventDefault()
    this.props.setCode({ result: this.state.result, stock: this.props.stock })
  }
  handleChange = evt => {
    this.setState({ result: evt.target.value })
  }

  componentWillUnmount () {
    if (!this.state.pwa) Quagga.stop()
  }
  render () {
    return (
      <div>
        <div className='camera'>
          {this.state.pwa ? (
            <form onSubmit={this.handleSubmitPwa}>
              <h1>
                If you can see this, your browser is a bitch. You'll have to
                type the codes in here until I find a better solution.
              </h1>
              <input
                type='number'
                className='textbox'
                value={this.state.result}
                onChange={this.handleChange}
              />
            </form>
          ) : (
            <div id='cameraViewport' />
          )}
        </div>
        <div className='menu'>
          {this.state.pwa ? (
            <img
              src='./assets/format/confirm.png'
              onClick={this.handleSubmitPwa}
              className='back'
            />
          ) : (
            <div />
          )}

          <img
            className='back'
            src='./assets/format/back.png'
            onClick={() => {
              history.push('/hanger')
            }}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    stock: state.info.stock,
    result: state.info.code
  }
}
const mapDispatch = dispatch => {
  return {
    async setCode (code) {
      dispatch(await setCode(code))
    }
  }
}

export const ConnectedCamera = connect(
  mapState,
  mapDispatch
)(Camera)

export default ConnectedCamera
