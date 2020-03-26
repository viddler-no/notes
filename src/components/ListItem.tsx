import React, { useEffect, useRef } from 'react';
import * as AutoMerge from 'automerge';
import { DocType } from '../doctype';
import { compose, tokens } from 'classy-ui';
import ListIcon from './ListIcon';

//let test = tokens.fontFamily.FONT_SANS;

export interface ListItemProps {
    doc: AutoMerge.FreezeObject<DocType>;
    index: number;
    currentIndex: number;
    value: string;
    addItem: (doc: AutoMerge.FreezeObject<DocType>, index: number) => void;
    setText: (
        doc: AutoMerge.FreezeObject<DocType>,
        index: number,
        text: string
    ) => void;
}

/**
 * Expected to run in useEffect and returns a cleanup function
 */
function autoExpand(el: HTMLTextAreaElement) {
    let computed = window.getComputedStyle(el);
    // Calculate the height
    let extraHeight =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    // Initial run on mount
    el.style.height = 'inherit';
    el.style.height = el.scrollHeight + extraHeight + 'px';
    let listener = (e: Event) => {
        el.style.height = 'inherit';
        el.style.height = el.scrollHeight + extraHeight + 'px';
    };
    el.addEventListener('keyup', listener);
    el.addEventListener('input', listener);
    el.addEventListener('paste', listener);
    return () => {
        el.removeEventListener('keyup', listener);
        el.removeEventListener('input', listener);
        el.removeEventListener('paste', listener);
    };
}

export const ListItem: React.FC<ListItemProps> = ({
    index,
    currentIndex,
    doc,
    addItem,
    value,
    setText
}) => {
    let change = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            //console.log(e);
            setText(doc, index, e.target.value);
        },
        [doc]
    );
    let keyPress = React.useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addItem(doc, index);
            }
            //console.log(e, e.key);
        },
        [doc]
    );
    let ref = useRef<HTMLTextAreaElement | null>(null);
    useEffect(() => {
        if (ref.current !== null) {
            console.log(index, currentIndex);
            if (currentIndex === index) {
                ref.current.focus();
            }
            return autoExpand(ref.current);
        }
    }, []);
    return (
        <div className="list-item">
            <div className="list-item-bullet">
                <ListIcon />
            </div>
            <div className="list-item-edit">
                <textarea
                    ref={ref}
                    rows={1}
                    onChange={change}
                    onKeyPress={keyPress}
                    value={value}
                />
            </div>
        </div>
    );
};
