import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quagga from 'quagga'
import { setCode } from '../store/info'
import history from '../history'

class Camera extends Component {
  constructor () {
    super()
    this.state = {
      scanned: false
    }
  }

  async componentDidMount () {
    await this.props.setCode({
      result: '110599686056',
      stock: this.props.stock
    })
    // Quagga.init(
    //   {
    //     inputStream: {
    //       type: 'LiveStream',
    //       target: document.querySelector('#cameraViewport'),
    //       constraints: {
    //         width: { min: 640 },
    //         height: { min: 480 },
    //         facingMode: 'environment',
    //         aspectRatio: { min: 1, max: 2 }
    //       }
    //     },
    //     locator: {
    //       patchSize: 'medium',
    //       halfSample: true
    //     },
    //     numOfWorkers: 2,
    //     frequency: 10,
    //     decoder: {
    //       readers: [
    //         'upc_reader',
    //         'codabar_reader',
    //         'upc_reader',
    //         'upc_e_reader'
    //       ]
    //     },
    //     locate: true
    //   },
    //   function (err) {
    //     if (err) {
    //       console.log(err)
    //       return
    //     }
    //     Quagga.start()
    //     console.log('Initialization finished. Ready to start')
    //   }
    // )
    // Quagga.onProcessed(function (result) {
    //   var drawingCtx = Quagga.canvas.ctx.overlay

    //   var drawingCanvas = Quagga.canvas.dom.overlay

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(
    //         0,
    //         0,
    //         parseInt(drawingCanvas.getAttribute('width')),
    //         parseInt(drawingCanvas.getAttribute('height'))
    //       )
    //       result.boxes
    //         .filter(function (box) {
    //           return box !== result.box
    //         })
    //         .forEach(function (box) {
    //           Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
    //             color: 'green',
    //             lineWidth: 2
    //           })
    //         })
    //     }

    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
    //         color: '#00F',
    //         lineWidth: 2
    //       })
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(
    //         result.line,
    //         { x: 'x', y: 'y' },
    //         drawingCtx,
    //         { color: 'red', lineWidth: 3 }
    //       )

    //       submit(result.codeResult.code)
    //     }
    //   }
    // })

    // const sleep = miliseconds => {
    //   var currentTime = new Date().getTime()

    //   while (currentTime + miliseconds >= new Date().getTime()) {}
    // }
    // let i = 0
    // const submit = async result => {
    //   if (i > 3) {
    //     Quagga.stop()
    //     this.props.setCode({ result, stock: this.props.stock })
    //     this.setState({ scanned: true })
    //   } else {
    //     i++
    //     sleep(100)
    //   }
    // }
  }
  componentWillUnmount () {
    // Quagga.stop()
  }
  render () {
    return (
      <div>
        <div className='camera'>
          <div id='cameraViewport' />
        </div>
        <div className='hanger'>
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
