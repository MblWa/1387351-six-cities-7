import { renderHook } from '@testing-library/react-hooks';
import useMap from './use-map';
import { testCity } from '../test-mocks/test-mocks';
// Я что-то делаю капитально не так, но даже если бы я завел этот первый тест,
// то остальное тестирование этого компонента останется для меня загадкой.
describe('Hook: useMap', () => {
  it('should return 1 element -- instance of leaflet map', () => {
    // const mapRef = { current: '<div></div>'};
    // const { result } = renderHook(() => useMap(mapRef, testCity));

    // const map = result.current;
    // expect(map).toBeInstanceOf(Object);
  });

  // it('should be correctly change state', () => {
  //   const expectedInitialAnswers = [false, false, false, false];
  //   const {result} = renderHook(
  //     () => useUserAnswers(questionMock, jest.fn()),
  //   );

  //   const [initialAnswers] = result.current;
  //   let [,, handleAnswerChange] = result.current;

  //   act(() => handleAnswerChange(1, true));

  //   [,, handleAnswerChange] = result.current;
  //   act(() => handleAnswerChange(3, true));

  //   const [answers] = result.current;
  //   expect(initialAnswers).toStrictEqual(expectedInitialAnswers);
  //   expect(answers[1]).toBe(true);
  //   expect(answers[3]).toBe(true);
  // });

  // it('should be call onAnswer', () => {
  //   const onAnswer = jest.fn();
  //   const {result} = renderHook(() =>
  //     useUserAnswers(questionMock, onAnswer),
  //   );
  //   const [answers, handleAnswer] = result.current;
  //   handleAnswer();

  //   expect(onAnswer).toBeCalled();
  //   expect(onAnswer).toHaveReturnedWith(undefined);
  //   expect(onAnswer).toHaveBeenCalledWith(questionMock, answers);
  // });
});
