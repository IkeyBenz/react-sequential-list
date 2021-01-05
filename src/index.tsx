import React from "react";

export type SequentialListItem = React.ReactElement<{ onComplete(): void }>;
interface SequentialListProps {
  children: SequentialListItem[];

  /** @default "onComplete" */
  completionCallbackName?: string;
}

/** SequentialList
 * Renders a list of items one at a time until they call their onComplete callback.
 * This callback name can be specified using the optional prop `completionCallbackName`
 *
 * Children of this list are expected to contain an 'onComplete' callback method
 * that is expected to be called when this task is considered 'complete'
 *
 * The PunchList will render all children whose tasks have completed, as well as
 * the next in progress task. It will go through and render each task one by one
 * as they complete.
 */
const SequentialList: React.FC<SequentialListProps> = ({
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

export default SequentialList;
