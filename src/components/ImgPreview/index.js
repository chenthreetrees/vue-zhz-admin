import ImgPreviewComponent from './ImgPreview'

const ImgPreview = {}

ImgPreview.install = Vue => {
  const ImgConstructor = Vue.extend(ImgPreviewComponent)

  const instance = new ImgConstructor()

  instance.$mount(document.createElement('div'))

  document.body.appendChild(instance.$el)

  Vue.prototype.$imgPreview = (e) => {
    instance.target = e.currentTarget
    console.log('instance.target', instance.target)
    if (instance.target.getAttribute('src')) {
      instance.imgs = instance.target.getAttribute('src').replace('_160x160', '')
    } else {
      instance.imgs = null
    }
    instance.isShowImageDialog = true
  }
}

export default ImgPreview
