# ToolTipAtlas

This repository is intended for the development of a ToolTip in the form of a directive
with dynamic values and with the possibility of adding functionalities.

**Front-end:** Angular, TypeScript

# Screenshots
![image](https://user-images.githubusercontent.com/65831338/178854426-b65f1b6b-a808-4fbe-b90e-d9b784059cbc.png)
![image](https://user-images.githubusercontent.com/65831338/178854492-ce8aaa02-4403-405b-aec9-4c51477e6217.png)


#
![image](https://user-images.githubusercontent.com/65831338/178854619-08ccc70c-e46b-441b-8463-6348dd77379b.png)

![image](https://user-images.githubusercontent.com/65831338/178854544-14976898-7f3f-466a-9e3b-9ac0cc4fda5b.png)
![image](https://user-images.githubusercontent.com/65831338/178854686-cbb74ecd-b051-4295-82d1-8ac3d07ed1aa.png)
![image](https://user-images.githubusercontent.com/65831338/178854745-68fa7324-009e-4b1b-bfda-3f8c3ecda15b.png)


# Utils
```javascript
<Element appToolTip tooltip="tooltip" theme="theme" position="position" [delay]="10"><Element/>

        -- tooltip:   Text that will fill the tooltip.

        -- delay:     Delay to show content.

        -- theme:     Light or dark theme selector.
            |_ dark & white.

        -- position:  Tooltip position referring to the component.
            |_ top & bottom & left & right.


     CSS Recommended:
        .tooltip {
            width: auto;
            max-width: 250px;
            position: absolute;
            text-align: center;
            font-size: 14px;
            padding: 6px 10px;
            border-radius: 4px;
            line-height: initial;
            z-index: 1000;
            opacity: 0;
            animation: 0.18s ease-out;
            pointer-events: none;

                &-dark {
                    color: white;
                    background: #202124;
                }

                &-white {
                    color: #5e5e5e;
                    background: white;
                }
        }

        .tooltip-show {
            opacity: 1;
        }
```
