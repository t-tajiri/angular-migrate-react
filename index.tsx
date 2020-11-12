import { IComponentOptions, IChangesObject } from 'angular'
import ReactDOM from 'react-dom'

type OnChanges<T> = {
  [K in keyof T]: IChangesObject<T[K]>
}

export function angularIn<Props>(ReactComponent: React.ComponentType<Props>): IComponentOptions {
  return {
    //TODO define bindings
    // bindings:

    controller: class ReactController {
      public props: Partial<Props> = {} as Partial<Props>
      //TODO resolve any type if possible
      public injectedProps: { [name: string]: any }

      private destoryed = false
      private $element

      //TODO resolve unknown type
      constructor($element: unknown) {
        this.$element = $element
      }

      $onChanges(changes: OnChanges<Partial<Props>>) {
        //TODO refer these code
        // https://github.com/coatue-oss/ngcomponent/blob/master/index.ts
        // https://github.com/coatue-oss/react2angular/blob/master/index.tsx
        this.render()
      }

      $onDestroy() {
        this.componentWillUnmount()
      }

      render(): void {
        if (this.destoryed) {
          //TODO resolve any type if possible
          ReactDOM.render(<ReactComponent {...this.props} {...(this.injectedProps as any)} />, this.$element[0])
        }
      }

      componentWillUnmount(): void {
        this.destoryed = true
        ReactDOM.unmountComponentAtNode(this.$element[0])
      }
    }
  }
}
