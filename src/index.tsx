import React from "react";

export type PunchListItem = React.ReactElement<{ onComplete(): void }>;
interface PunchListProps {
  children: PunchListItem[];

  /** @default "onComplete" */
  completionCallbackName?: string;
}

/** PunchList
 * Renders a task queue with completed tasks and the current in progress task.
 *
 * Children of this list are expected to contain an 'onComplete' callback method
 * that is expected to be called when this task is considered 'complete'
 *
 * The PunchList will render all children whose tasks have completed, as well as
 * the next in progress task. It will go through and render each task one by one
 * as they complete.
 */
const PunchList: React.FC<PunchListProps> = ({
  children,
  completionCallbackName = "onComplete",
}) => {
  const [numRenderedChildren, setNumRenderedChildren] = React.useState(0);

  const modifiedChildren = React.useMemo(() => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        [completionCallbackName]: () =>
          setNumRenderedChildren((num) => num + 1),
      });
    });
  }, [children, completionCallbackName]);

  return (
    <>
      {React.Children.map(modifiedChildren, (child, index) => {
        if (index <= numRenderedChildren) {
          return child;
        }
        return null;
      })}
    </>
  );
};

export default PunchList;
