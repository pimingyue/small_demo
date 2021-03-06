import {HTTP} from '../util/http.js'


class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url:'json/classic.json',
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res.type)
      }
    })
  }

  getClassic(index,nextPrevious,sCallback){
    let key = nextPrevious =='next'?
        this._getKey(index+1):this._getKey(index-1)
    let classic = wx.getStorageSync(key)

    if(!classic){
      this.request({
        url: 'json/' + nextPrevious + '.json',
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
  }

  isFirst(index){
    return index == 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex(){
    let index = wx.getStorageSync('latest');
    return index
  }

  _getKey(index){
    let key = 'classic-'+index
    return key
  }

}

export {ClassicModel}
