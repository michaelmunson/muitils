import {createSx, extendSx} from '../../src/sx';

const rootSx = createSx({
  classes: <const>['root_class_1', 'root_class_2'],
  definitions: {
    root_class_1: {
      color: 'red'
    },
    root_class_2: {
      color: 'blue'
    }
  }
})

describe('sx', () => {
  test('extendSx', () => {
    const newSx = extendSx(rootSx, {
      classes: <const>['new_class_1', 'new_class_2'],
      definitions: {
        new_class_1: {
          color: 'green'
        },
        new_class_2: {
          color: 'yellow'
        }
      } 
    })
    expect(Object.keys(newSx.classes).length).toBe(4)
    expect(newSx.definitions['new_class_1']).toBeDefined()
    expect(newSx.definitions['new_class_2']).toBeDefined()
    expect(newSx.definitions['root_class_1']).toBeDefined()
    expect(newSx.definitions['root_class_2']).toBeDefined()
    expect(newSx.classes.new_class_1).toBe('new_class_1')
    expect(newSx.classes.new_class_2).toBe('new_class_2')
    expect(newSx.classes.root_class_1).toBe('root_class_1')
    expect(newSx.classes.root_class_2).toBe('root_class_2')
  })
})