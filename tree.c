#include <stdio.h>
#include <stdlib.h>

void buildTree(int *height);

int main(int arg, char *arg1[]){

    int height; 
    FILE *file = NULL;

    if(arg < 1){
        printf( "Enter the Height of the Tree: " );
        scanf( "%d", &height );
    }
    else if(arg > 1){
        file = fopen( arg1[2], "w" );
    }
    else{
        height = atoi( arg1[1] );
    }


    if(height < 0 || height > 15){
        // Exit restart
    }

    buildTree(&height);

    return 0;
}

void buildTree(int *height){
    for(int i = 1; i <= *height; i++){
        if( *height - i >= 3){
            *height -=  3;
            for(int j = 0; j < *height - i; j++){
                putchar(' ');
            }
            for(int j = 1; j < i -2; j++){
                putchar('*');
            }
        }
        else{
            for(int i = 0; i < *height - 4; i++){
                putchar(' ');
            }
            putchar('*');
        }
        putchar('\n');

    }
}
