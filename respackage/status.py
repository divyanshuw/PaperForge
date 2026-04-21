from sympy import print_fcode
import click
from app.db import status_check



@click.command()
@click.option('--verbose','-v',is_flag = True,help="Show verbose status")
def status(verbose: bool):
    if verbose:
        click.secho("Showing verbose status...", fg='yellow')
        stats = status_check()
        print(f"\nIndex Stats: {stats}")
        print(f"Total vectors in index: {stats['total_vector_count'] if stats else 'N/A'}") 
    else:
        click.secho("Showing status...", fg='yellow')
        if(status_check()):
            print("The system is working.")
        else:
            print("The system is not working.")