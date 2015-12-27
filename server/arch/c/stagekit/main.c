#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include "stagekit.h"

void* enableTimeLimitFog(void *threadid)
{
  sk_fogon();
  printf("Fog engaged\n");
  sleep(5);
  sk_fogoff();

  pthread_exit(NULL);
}

int main (int argc, char *argv[])
{
  int opt = 0;
  int i = -1;
  int sk_option = -1;
  pthread_t threads;
  unsigned int color;
  unsigned int k;

  sk_init(NULL);

  while ((opt = getopt(argc, argv, "orf:s:")) != -1) {

    switch(opt) {
      case 'o':
        sk_option = 0;
        break;

      case 'r':
        sk_option = 19;
        break;

      case 'f':
        i = atoi(optarg);
        switch(i)
        {
          case 0:
            sk_option = 11;
            break;

          default:
            sk_option = 10;
        }
        break;

      case 's':
        i = atoi(optarg);
        switch(i)
        {
          case 0:
            sk_option = 1;
            break;
          case 1:
            sk_option = 2;
            break;
          case 2:
            sk_option = 3;
            break;
          case 3:
            sk_option = 4;
            break;
          case 4:
            sk_option = 5;
            break;

          default:
            sk_option = 5;
        }
        break;

        default:
          printf("0 - Panic\n1-5 - Strobe\n6 - Set red lights\n7 - Set yellow lights\n8 - Set green lights\n9 - Set blue lights\n10 - Fog on\n11 - Fog off\n");
          sk_option = -1;
          break;
    }
  }

  switch(sk_option)
  {
    case 0:
      sk_alloff();
      printf("Turned off everything\n");
      break;
    case 1:
      sk_nostrobe();
      printf("Turned off strobe\n");
      break;
    case 2:
      sk_slowstrobe();
      printf("Started a slow strobe\n");
      break;
    case 3:
      sk_medstrobe();
      printf("Started a medium strobe\n");
      break;
    case 4:
      sk_faststrobe();
      printf("Started a fast strobe\n");
      break;
    case 5:
      sk_fasteststrobe();
      printf("Started the fastest strobe\n");
      break;
    case 6:
      printf("Enter a value (in hex) for the red lights:");
      scanf("%0x", &color);
      sk_setred(color);
      printf("Sent %02hx to the red array\n",color);
      break;
    case 7:
      printf("Enter a value (in hex) for the yellow lights:");
      scanf("%x", &color);
      sk_setyellow(color);
      printf("Sent %02hx to the yellow array\n",color);
      break;
    case 8:
      printf("Enter a value (in hex) for the green lights:");
      scanf("%02hx", &color);
      sk_setgreen(color);
      printf("Sent %02hx to the green array\n",color);
      break;
    case 9:
      printf("Enter a value (in hex) for the blue lights:");
      scanf("%02hx", &color);
      sk_setblue(color);
      printf("Sent %x to the blue array\n",color);
      break;
    case 10:
      pthread_create(&threads, NULL, enableTimeLimitFog, NULL);
      pthread_exit(NULL);
      break;
    case 11:
      sk_fogoff();
      printf("Fog disengaged\n");
      break;
    case 12:
      usleep(60000);
      break;
    default:
      break;
  }

  return 0;
}
