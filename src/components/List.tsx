import * as React from 'react';
import * as AutoMerge from 'automerge';
import { ListItem } from './ListItem';
import { DocType } from '../doctype';

export interface ListProps {}

export const List: React.FC<ListProps> = () => {
    let [doc, setDoc] = React.useState(
        AutoMerge.from<DocType>({
            items: ['']
        })
    );
    let [from, setFrom] = React.useState(null);
    let [currentIndex, setCurrentIndex] = React.useState(0);
    let addItem = React.useCallback(
        (doc: AutoMerge.FreezeObject<DocType>, index: number) => {
            console.log('Add item');
            setCurrentIndex(doc.items.length);
            setDoc(
                AutoMerge.change(doc, 'Add item', doc => {
                    //doc.items.insertAt(index + 1, '');
                    doc.items.push('');
                })
            );
        },
        []
    );
    let setText = React.useCallback(
        (doc: AutoMerge.FreezeObject<DocType>, index, text) => {
            console.log('Text input');
            setFrom(performance.now());
            setDoc(
                AutoMerge.change(doc, 'Text input', doc => {
                    doc.items[index] = text;
                })
            );
        },
        []
    );
    console.log(performance.now() - from);
    /*
    console.log("Render");
    AutoMerge.getHistory(doc).map(entry => {
        console.log("Snapshot", entry.change, entry.snapshot);
    });
    console.log("Done render");*/
    return (
        <div>
            {doc.items.map((value, index) => (
                <ListItem
                    key={index}
                    doc={doc}
                    index={index}
                    currentIndex={currentIndex}
                    value={value}
                    setText={setText}
                    addItem={addItem}
                />
            ))}
        </div>
    );
};
