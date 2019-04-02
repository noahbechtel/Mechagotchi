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
        numOfWorkers: 4,

        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#cameraViewport'),
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment'
          }
        },
        decoder: {
          readers: [
            'upc_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader'
          ]
        }
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
  render () {
    Quagga.onDetected(data => {
      if (!this.state.done) {
        this.props.setCode(data.codeResult.code)
        Quagga.stop()
        this.props.history.push('/home')
      }
    })

    return (
      <div className='hanger'>
        <div id='cameraViewport' />

        <button
          onClick={() => {
            Quagga.stop()
            this.props.history.push('/home')
          }}
        >
          Back
        </button>
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
